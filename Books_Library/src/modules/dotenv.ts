import dotenv from "dotenv"

dotenv.config()

export const getEnvParams = () => {
  return {
    port: process.env.SERV_PORT,
    host: process.env.SERV_HOST,
    adminParam: process.env.ADMIN_PARAMS,
    limitBooks: process.env.LIMIT_BOOKS,
    dbUser: process.env.MYSQL_USER,
    dbPass: process.env.MYSQL_PASSWORD,
    dbName: process.env.MYSQL_DATABASE,
    dbHost: process.env.MYSQL_HOST,
  };
}