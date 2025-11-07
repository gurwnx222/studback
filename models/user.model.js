import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  registerationId: {
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
const User = mongoose.models.users || mongoose.model("users", UserSchema);
export default User;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Admin = mongoose.model.admins || mongoose.model("admins", AdminSchema);
export { Admin };
