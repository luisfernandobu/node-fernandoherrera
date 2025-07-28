import "dotenv/config";
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    DISCORD_WEBHOOK_URL: env.get('DISCORD_WEBHOOK_URL').required().asUrlString(),
    SECRET_TOKEN: env.get('SECRET_TOKEN').required().asString(),
}
