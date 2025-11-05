import mongoose, { Schema } from "mongoose";

const ProgrammeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    firstYearSubjects: {
      type: Schema.model.ObjectId,
      ref: "Subject",
    },
    secondYearSubjects: {
      type: Schema.model.ObjectId,
      ref: "Subject",
    },
    thirdYearSubjects: {
      type: Schema.model.ObjectId,
      ref: "Subject",
    },
    fourthYearSubjects: {
      type: Schema.model.ObjectId,
      ref: "Subject",
    },
  },
});
const Programme =
  mongoose.model.Programmes || Programme.model("Programmes", ProgrammeSchema);
export default Programme;
