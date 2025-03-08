import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    aadhaar: { type: String, required: true },
    dob: { type: Date, required: false },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    language: { type: String, enum: ["Hindi", "Marathi", "English"], required: true }
});

const Farmer = mongoose.model("Farmer", FarmerSchema);
export default Farmer;
