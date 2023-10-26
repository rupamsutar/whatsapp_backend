import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { findUser } from "../services/user.service.js";
import { doesConversationExist, createConversation, populateConversation, getUserConversations } from "../services/conversation.service.js";

export const create_open_conversation = async (req, res, next) => {
  try {
    const sender_id = req.user.userId;
    const { receiver_id } = req.body;

    if (!receiver_id) {
      logger.error("Please provide receiver_id");
      throw createHttpError.BadGateway("Something went wrong");
    }

    const existedConversation = await doesConversationExist(sender_id, receiver_id);

    if (existedConversation) {
        res.json({
            status: 'success',
            convo: existedConversation
        });
    } else {
        let receiver_user = await findUser(receiver_id);
        let convoData = {
            name: receiver_user.name,
            isGroup: false,
            users: [sender_id, receiver_id]
        }

        const newConvo = await createConversation(convoData);
        const populatedConvo = await populateConversation(
            newConvo._id.toString(),
            'users',
            '-password'
        )
        res.status(200).json(populatedConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversations = async(req, res, next) => {
    try {
        const user_id = req.user.userId;
        const conversations = await getUserConversations(user_id);
        res.status(200).json(conversations);
    } catch (error) {
        next(error);
    }
}

