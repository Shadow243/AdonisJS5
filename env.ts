/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),

  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),

  // PG_HOST: Env.schema.string({ format: 'host' }),
  // PG_PORT: Env.schema.number(),
  // PG_USER: Env.schema.string(),
  // PG_PASSWORD: Env.schema.string.optional(),
  // PG_DB_NAME: Env.schema.string(),

  // MSSQL_SERVER: Env.schema.string({ format: 'host' }),
  // MSSQL_PORT: Env.schema.number(),
  // MSSQL_USER: Env.schema.string(),
  // MSSQL_PASSWORD: Env.schema.string.optional(),
  // MSSQL_DB_NAME: Env.schema.string(),

  // ORACLE_HOST: Env.schema.string({ format: 'host' }),
  // ORACLE_PORT: Env.schema.number(),
  // ORACLE_USER: Env.schema.string(),
  // ORACLE_PASSWORD: Env.schema.string.optional(),
  // ORACLE_DB_NAME: Env.schema.string(),

    // DISCORD_CLIENT_ID: Env.schema.string(),
    // DISCORD_CLIENT_SECRET: Env.schema.string(),

    GOOGLE_CLIENT_ID: Env.schema.string(),
    GOOGLE_CLIENT_SECRET: Env.schema.string(),

    TWITTER_CLIENT_ID: Env.schema.string(),
    TWITTER_CLIENT_SECRET: Env.schema.string(),

    GITHUB_CLIENT_ID: Env.schema.string(),
    GITHUB_CLIENT_SECRET: Env.schema.string(),

    FACEBOOK_CLIENT_ID: Env.schema.string(),
    FACEBOOK_CLIENT_SECRET: Env.schema.string(),

    // SPOTIFY_CLIENT_ID: Env.schema.string(),
    // SPOTIFY_CLIENT_SECRET: Env.schema.string(),


    // MAIL CONFIGS
    SMTP_HOST: Env.schema.string({ format: 'host' }),
    SMTP_PORT: Env.schema.number(),
    SMTP_USERNAME: Env.schema.string(),
    SMTP_PASSWORD: Env.schema.string(),

    // SES_ACCESS_KEY: Env.schema.string(),
    // SES_ACCESS_SECRET: Env.schema.string(),
    // SES_REGION: Env.schema.string(),

    // MAILGUN_API_KEY: Env.schema.string(),
    // MAILGUN_DOMAIN: Env.schema.string(),

    // SPARKPOST_API_KEY: Env.schema.string()



    //file storage to cloudinary
    CLOUDINARY_NAME: Env.schema.string(),
    CLOUDINARY_API_KEY: Env.schema.string(),
    CLOUDINARY_API_SECRET: Env.schema.string(),
})
