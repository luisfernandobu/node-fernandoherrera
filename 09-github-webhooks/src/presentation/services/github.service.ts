import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";

export class GithubService {
    constructor() {}

    onStar(payload: GithubStarPayload): string {
        const { action, sender, repository } = payload;

        return `User ${sender.login} ${action} star on ${repository.full_name}`;
    }

    onIssue(payload: GithubIssuePayload): string {
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
}
