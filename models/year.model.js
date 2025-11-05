import mongoose, { Schema } from "mongoose";

const yearSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  programmeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Programme",
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

const Year = mongoose.model.years || Department.model("years", yearSchema);
export default Year;
