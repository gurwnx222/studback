import mongoose, { Schema } from "mongoose";

const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  forms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Form",
    },
  ],
});
const Subject =
  mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
export default Subject;
