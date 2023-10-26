import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "waconversations",
    },
    files: [],
  },
  {
    collection: "wamessages",
    timestamps: true,
  }
);

const MessageModel =
  mongoose.models.wamessages ||
  mongoose.model("wamessages", messageSchema);
export default MessageModel;