import mongoose, { Schema } from "mongoose";

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  departments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
});
const School = mongoose.models.School || mongoose.model("School", SchoolSchema);
export default School;
