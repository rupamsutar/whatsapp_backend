import jwt from 'jsonwebtoken';
import logger from '../configs/logger.config.js'

export const sign = async (payload, expires, secret) => {
    return new Promise ((resolve, reject) => {
        jwt.sign(payload, secret, {expiresIn: expires}, (error, token) => {
            if(error) {
                logger.error(error);
                reject(error);
            } else {
                resolve(token);
            }
        })
    })
}