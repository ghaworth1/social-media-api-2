const {Schema, model} = require("mongoose");

const User = model("User", userSchema);
const userSchema = new Schema({
  username:
    {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
  email:
    {
      type: email,
      unique: true,
      required: true,
    },
    thoughts: 
      [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought"
        },
    ],
    friends: 
      [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
      ]
  },
  {
    toJSON:
      {
        virtuals: true,
        getters: true
      },
    id: false
});

module.exports = User;