import jwt from "jsonwebtoken";
import { Log } from "#utils";

const verifyJWT = async (token = "") => {
  try {
    const { SCRT } = process.env;
    const { id } = jwt.verify(token, SCRT);
    return [true, id];
  } catch (error) {
    const errorMsg =
      error.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Token verification error";
    new Log(
      `JWT verification failed  |  [REASON] ${errorMsg}: ${error.message}`,
      "error",
      "auth"
    );
    return [false, null];
  }
};

export default verifyJWT;
