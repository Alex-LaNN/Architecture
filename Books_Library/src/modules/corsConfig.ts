import cors from "cors";
import { host, port } from "../utils/params.js";

const config = {
  origin: "http://" + host + ":" + port,
  methods: "GET,POST,PUT,PUTCH,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true,
};

export default cors(config);
