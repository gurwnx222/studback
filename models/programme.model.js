import mongoose, { Schema } from "mongoose";

const ProgrammeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});
const Programme =
  mongoose.models.programmes || Programme.model("programmes", ProgrammeSchema);
export default Programme;
