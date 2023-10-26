import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

export const doesConversationExist = async (sender_id, receiver_id) => {
  let convos = await ConversationModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!convos)
    throw createHttpError.BadRequest("Oops...Something went wrong !");

  // return convos
  //populate message model
  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return convos[0];
};

export const createConversation = async (data) => {
  const newConvo = await ConversationModel.create(data);

  if (!newConvo)
    throw createHttpError.BadRequest("Oops.. Something went wrong");
  return newConvo;
};

export const populateConversation = async (
  id,
  fieldToPopulate,
  fieldsToRemove
) => {
  const populatedConvo = await ConversationModel.findOne({ _id: id }).populate(
    fieldToPopulate,
    fieldsToRemove
  );

  if (!populatedConvo)
    throw createHttpError.BadRequest("Oops.. Something went wrong");

  return populatedConvo;
};

export const getUserConversations = async (userId) => {
  let conversations;
  await ConversationModel.find({
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (result) => {
      result = await UserModel.populate(result, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversations = result;
    }).catch((err) => {
      throw createHttpError.BadRequest("Oops.. Something went wrong");
    });

  return conversations;
};

export const updateLatestMessage = async(convo_id, msg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg
  })

  if (!updatedConvo) throw createHttpError.BadRequest("Opps..  Something went wrong");

  return updatedConvo;
}