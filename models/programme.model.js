import mongoose, { Schema } from "mongoose";

const ProgrammeSchema = new Schema({
  name: {
    type: String,
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
  mongoose.models.programmes || mongoose.model("programmes", ProgrammeSchema);
export default Programme;
