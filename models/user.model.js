import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  registerationID: {
    type: String,
    required: true,
    unique: true,
  },
  school: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  programmes: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model.users || User.model("users", UserSchema);
export default User;
