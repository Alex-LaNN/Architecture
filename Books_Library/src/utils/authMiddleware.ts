import { getEnvParams } from "../modules/dotenv.js";
import { Request, Response, NextFunction } from "express";
import basicAuth from "express-basic-auth";

/* Get the value of the 'adminParam' parameter from environment variables 
   and convert it to a string. */
const access: string = getEnvParams().adminParam!;

// Creating 'middleware' for basic authentication with given parameters.
export const auth = basicAuth({
  // List of users and their passwords.
  users: { admin: "pass" },
  // Message in case of unauthorized access.
  unauthorizedResponse: "Unauthorized",
  // Flag to send 'WWW-Authenticate' header.
  challenge: true,
});

// Creating a 'middleware' function to check authorization.
export default function getAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Getting the 'Authorization' header value from the request.
  const user = req.get("authorization");
  /* If the 'Authorization' header is missing or its value does not match 'access' => 
    send the 'WWW-Authenticate' header with the corresponding error 401 (Unauthorized) */
  if (!user && access !== user) {
    res.set("WWW-Authenticate", 'Basic realm="Login Required"');
    res.status(401);
  } else {
    // If authorization was successful => call the next function in the 'middleware' chain.
    return next();
  }
}
