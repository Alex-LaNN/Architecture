import dotenv from "dotenv"

dotenv.config()

export const getParams = () => {
  return {
    PORT: process.env.SERV_PORT,
    HOST: process.env.SERV_HOST,
  };
}