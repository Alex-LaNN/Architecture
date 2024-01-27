import { getEnvParams } from "../modules/dotenv.js";
import { Request, Response, NextFunction } from "express";
import basicAuth from "express-basic-auth";

const envParams = getEnvParams();

const access: string = envParams.adminParam!;
console.log(`7 access: ${access}`);
// const encodedCredentials = access.split(" ")[1];
// const decodedCredentials = atob(encodedCredentials);

// // Разделение декодированной строки на 'username' и 'password'
// const [name, pass] = decodedCredentials.split(":");

export const auth = basicAuth({
  users: { admin: "pass" },
  unauthorizedResponse: "Unauthorized",
  challenge: true,
});

export default function getAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //  console.log(`10 req.headers: ${JSON.parse(JSON.stringify(req.headers))}`);
  const user = req.get("authorization");
  //  const user = basicAuth(req);
  console.log(`12 user: ${user}`); ///////////////////////////////////////
  if (!user && access !== user) {
    res.set("WWW-Authenticate", 'Basic realm="Login Required"');
    res.status(401);
  } else {
    return next();
  }
}
