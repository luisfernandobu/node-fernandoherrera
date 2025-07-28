import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { GithubService } from "./presentation/services/github.service";
import { DiscordService } from "./presentation/services/discord.service";

(() => {
    main();
})();

function main() {
    const app = express();
    app.use(express.json());

    const githunService = new GithubService();
    const discordService = new DiscordService();
    const githubController = new GithubController(
        githunService, 
        discordService
    );

    app.post('/api/github', githubController.webhookHandler);

    app.listen(envs.PORT, () => {
        console.log('Server running on port: ' + envs.PORT);
    });
}
