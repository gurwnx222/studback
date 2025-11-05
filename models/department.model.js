import mongoose, { Schema } from "mongoose";

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  programmes: {
    type: Schema.Types.ObjectId,
    ref: "programme",
  },
});
const Department =
  mongoose.model.departments ||
  Department.model("departments", DepartmentSchema);
export default Department;
