import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import logger from "../configs/logger.config.js";

export default async function(req, res, next) {
    if(!req.headers["authorization"])
    return next(createHttpError.Unauthorized());

    const bearerToken = req.headers.authorization.split(" ")[1];
    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if(error) {
            logger.error(error)
        } else {
            req.user = payload;
            next();
        }
    });
}