import { sign } from "../utils/token.util.js";

export const generateToken = async(payload, expires, secret ) => {
    let token = sign(payload, expires, secret);
    return token;
}