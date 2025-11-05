import mongoose, { Schema } from "mongoose";

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  departments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
});
const School = mongoose.model.Schools || School.model("Schools", SchoolSchema);
export default School;
