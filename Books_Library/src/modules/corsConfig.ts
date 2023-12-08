import cors from "cors"
import { getParams } from "./dotenv.js";

const { HOST, PORT } = getParams();

 const config = {
   origin: HOST! + PORT,
   methods: "GET,POST,PUT,DELETE",
   allowedHeaders: "Content-Type",
   credentials: true,
};
 
export default cors(config)