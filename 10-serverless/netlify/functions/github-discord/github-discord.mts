import type { Context } from "@netlify/functions";

const notify = async(message: string) => {
    const body = {
        content: message,
    }
    
    const discordUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordUrl) {
        throw 'Missing DISCORD_WEBHOOK_URL';
    }

    const resp = await fetch(discordUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!resp.ok) {
        console.log('Error sending message to discord');
        return false;
    }

    return true;
}

const onStar = (payload: any): string => {
    const { action, sender, repository } = payload;

    return `User ${sender.login} ${action} star on ${repository.full_name}`;
}

const onIssue = (payload: any): string => {
    const { action, issue } = payload;

    if (action === 'opened') {
        return `An issue was opened with title ${issue.title} by ${issue.user.login}`;
    }
    
    if (action === 'closed') {
        return `Issue ${issue.title} was closed by ${issue.user.login}`;
    }

    if (action === 'reopened') {
        return `Issue ${issue.title} was reopened by ${issue.user.login}`;
    }

    return `Unhandled action for the issue event ${action}`;
}

const verifyGithubSignature = async(req: Request, payload: string) => {
    const xHubSignature = req.headers.get('x-hub-signature-256') ?? '';
    
    const secret = process.env.SECRET_TOKEN;
    if (!secret) {
        throw 'Missing SECRET_TOKEN';
    }
    
    const isValid = await verifySignature(secret, xHubSignature, payload);

    return isValid;
}

const verifySignature = async(secret: string, header: string, payload: string) => {
    const encoder = new TextEncoder();

    try {        
        let parts = header.split("=");
        let sigHex = parts[1];

        let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

        let keyBytes = encoder.encode(secret);
        let extractable = false;
        let key = await crypto.subtle.importKey(
            "raw",
            keyBytes,
            algorithm,
            extractable,
            ["sign", "verify"],
        );

        let sigBytes = hexToBytes(sigHex);
        let dataBytes = encoder.encode(payload);
        let equal = await crypto.subtle.verify(
            algorithm.name,
            key,
            sigBytes,
            dataBytes,
        );

        return equal;
    } catch (error) {
        console.log(`${error}`);
        return false;
    }
}

const hexToBytes = (hex: string = '') => {
    let len = hex.length / 2;
    let bytes = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
        let c = hex.slice(i, i + 2);
        let b = parseInt(c, 16);
        bytes[index] = b;
        index += 1;
    }

    return bytes;
}

export default async (req: Request, context: Context) => {
    const githubEvent = req.headers.get('x-github-event') ?? 'unknown';
    const payload = await req.json();
    let message: string;

    const isValidSignature = await verifyGithubSignature(req, JSON.stringify(payload));
    if (!isValidSignature) {
        return new Response(
            JSON.stringify({ error: 'Invalid signature'}),
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    switch (githubEvent) {
        case 'star':
            message = onStar(payload);
            break;
    
        case 'issues':
            message = onIssue(payload);
            break;
        
        default:
            message = `Unkown event: ${githubEvent}`;
            break;
    }

    await notify(message);
    
    return new Response(
        JSON.stringify({ message: 'done'}),
        {
            status: 202,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}
