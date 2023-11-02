import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Conversation is required"],
      trim: true,
    },

    picture: {
      type: String,
      required: true
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },

    users: [
      {
        type: ObjectId,
        ref: "UserModel",
      },
    ],
    
    latestMessage: {
      type: ObjectId,
      ref: "wamessages",
    },

    admin: {
      type: ObjectId,
      ref: "userModel",
    },
  },
  {
    collections: "waconversations",
    timestamps: true,
  }
);

const ConversationModel =
  mongoose.models.ConversationModel ||
  mongoose.model("waconversations", conversationSchema);

export default ConversationModel;
