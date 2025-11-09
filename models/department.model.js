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
  mongoose.models.department || mongoose.model("department", DepartmentSchema);
export default Department;
