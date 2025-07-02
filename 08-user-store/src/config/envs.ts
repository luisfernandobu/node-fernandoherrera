import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    JWT_SEED: env.get('JWT_SEED').required().asString(),
}
