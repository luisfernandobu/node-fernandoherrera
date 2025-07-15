import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    JWT_SEED: env.get('JWT_SEED').required().asString(),
    SEND_EMAIL_CONFIRMATION: env.get('SEND_EMAIL_CONFIRMATION').default('false').asBool(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    WEBSERVICE_URL: env.get('WEBSERVICE_URL').required().asString(),
    NODE_ENV: env.get('NODE_ENV').default('production').asString(),
}
