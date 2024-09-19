import jwt from "jsonwebtoken";

const { SCRT } = process.env;

const verifyJWT = (token = "") => {
  try {
    const { id } = jwt.verify(token, SCRT);

    return [true, id];
  } catch (error) {
    return [false, null];
  }
};

export default verifyJWT;
