import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";

export const create_open_conversation = async(req, res, next) => {
    try {
        const sender_id = req.user.userId;
        const {receiver_id} = req.body;

        if (!receiver_id) {
            logger.error('Please provide receiver_id');
            throw createHttpError.BadGateway('Something went wrong');
        }

        res.json({
           receiver_id
        })
    } catch (error) {
        next(error)
    }
}