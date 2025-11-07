import mongoose, { Schema } from "mongoose";

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  programmes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Programme",
    },
  ],
});
const Department =
  mongoose.models.departments ||
  mongoose.model("departments", DepartmentSchema);
export default Department;
