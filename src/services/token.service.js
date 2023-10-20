import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { sign, verify } from "../utils/token.util.js";
import UserModel from "../models/userModal.js";

export const generateToken = async (payload, expires, secret) => {
  let token = sign(payload, expires, secret);
  return token;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
  if (!user) throw createHttpError.NotFound("Invalid Credentials");

  let passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) throw createHttpError.NotFound("Invalid Credentials");

  return user;
};

export const verifyToken = async(token, secret) => {
    let check = await verify(token, secret);
    return check
}