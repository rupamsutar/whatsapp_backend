import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Conversation is required"],
      trim: true,
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
      ref: "MessageModel",
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
