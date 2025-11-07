import mongoose, { Schema } from "mongoose";

const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  form: {
    type: Schema.Types.ObjectId,
    ref: "Form",
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});
const Subject =
  mongoose.models.subjects || Subject.model("subjects", SubjectSchema);
export default Subject;
