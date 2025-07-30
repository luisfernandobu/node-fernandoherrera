import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    const mySecret = process.env.SECRET_VARIABLE;

    if (!mySecret) {
        throw 'Missing SECRET_VARIABLE';
    }

    console.log({ mySecret });

    return new Response(
        JSON.stringify({ mySecret }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}
