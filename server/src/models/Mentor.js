import mongoose from "mongoose";


const mentorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  experience: { type: String, required: true },
  expertise: { type: String, required: true },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Mentor = mongoose.model("Mentor", mentorSchema);
export default Mentor;
