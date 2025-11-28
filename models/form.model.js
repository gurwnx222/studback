import mongoose, { Schema } from "mongoose";

const FormSchema = new Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  subjectName: String,
  teacher: String,
  ratings: {
    type: [Number], // Array of 15 ratings (1-5)
    validate: [(arr) => arr.length === 15, "There must be 15 ratings."],
    required: true,
  },
  suggestion: {
    // Q16
    type: String,
    required: false,
  },
  observation: {
    // Q17
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.models.Form || mongoose.model("Form", FormSchema);
export default Form;
