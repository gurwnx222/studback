import mongoose, { Schema } from "mongoose";

const FormSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teachingEffectiveness: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  communicationSkills: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  subjectKnowledge: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  punctualityAndAvailability: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  subjectKnowledge: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  overallExperience: {
    type: String,
    minLength: [20, "Overall experience must be at least 20 characters long."],
    required: false,
  },
});
const Form = mongoose.model.Forms || Form.model("Forms", FormSchema);
export default Form;
