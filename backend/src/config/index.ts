export default {
  PORT: process.env.PORT,
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  JWT_SECRET: ()=>{
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        return process.env.JWT_SECRET;
    },
    redis_username: process.env.REDIS_USERNAME,
    redis_password: process.env.REDIS_PASSWORD,
    redis_port: process.env.REDIS_PORT,
    redis_host: process.env.REDIS_HOST,
    Redis_local_port: process.env.REDIS_LOCAL_PORT

};