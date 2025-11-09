import mongoose, { Schema } from "mongoose";

const ProgrammeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  semesters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Semester",
    },
  ],
});
const Programme =
  mongoose.models.programmes || mongoose.model("programmes", ProgrammeSchema);
export default Programme;
