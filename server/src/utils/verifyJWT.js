import jwt from "jsonwebtoken";
import { Log } from "#utils";

const verifyJWT = async (token = "") => {
  try {
    const { SCRT } = process.env;
    if (!SCRT) {
      throw new Log(
        "SCRT (secret) is not defined in environment variables.",
        "error",
        "access"
      );
    }

    // Verificar el token usando la clave secreta SCRT
    const { id } = jwt.verify(token, SCRT);
    return [true, id];
  } catch (error) {
    let errorMsg;

    if (error.name === "JsonWebTokenError") {
      errorMsg = "Invalid token";
    } else if (error.name === "TokenExpiredError") {
      errorMsg = "Token expired";
    } else {
      errorMsg = "Token verification error";
    }

    // Registrar el error
    new Log(
      `JWT verification failed  |  [REASON] ${errorMsg}: ${error.message}`,
      "error",
      "access"
    );

    new Log(`Token ${token}`, "info", "access");

    // Retornar un arreglo indicando que la verificación falló
    return [false, null];
  }
};

export default verifyJWT;
