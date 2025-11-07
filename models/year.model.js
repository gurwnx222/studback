import mongoose, { Schema } from "mongoose";

const YearSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  programmeId: {
    type: Schema.Types.ObjectId,
    ref: "Programme",
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

const Year = mongoose.models.years || mongoose.model("years", yearSchema);
export default Year;
