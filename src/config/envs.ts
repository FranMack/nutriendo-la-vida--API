import "dotenv/config";

export const envs={
    PORT:Number(process.env.PORT),
    MONGO_URL:process.env.MONGO_URL!,
    MONGO_DB_NAME:process.env.MONGO_DB_NAME!,
    JWT_SECRET:process.env.JWT_SECRET!,
    MAILER_SERVICE:process.env.MAILER_SERVICE!,
    MAILER_EMAIL:process.env.MAILER_EMAIL!,
    MAILER_SECRET_KEY:process.env.MAILER_SECRET_KEY!

}

