import mongoose, { Schema } from "mongoose";

const SemesterSchema = new Schema({
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

const Semester =
  mongoose.models.semester || mongoose.model("semester", SemesterSchema);
export default Semester;
