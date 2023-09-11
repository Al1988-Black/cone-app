const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        userName: { type: String, required: true },
        action: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "action_created_at" }, // взамен поле createdAt будеи поле action_created_at
    }
);

module.exports = model("Action", schema);
