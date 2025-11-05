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
  semester: {
    type: String,
    required: true,
  },
  form: {
    type: Schema.Types.ObjectId,
    ref: "Form",
  },
});
const Subject =
  mongoose.model.Subjects || Subject.model("Subjects", SubjectSchema);
export default Subject;
