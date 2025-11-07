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
const School = mongoose.models.schools || School.model("schools", SchoolSchema);
export default School;
