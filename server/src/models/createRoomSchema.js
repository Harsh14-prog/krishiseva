import mongoose from "mongoose";

const createRoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  region: { type: String, required: false },
  cropType: { type: String, required: false },
  harvestDate: { type: Date, required: true },
  farmingArea: { type: Number, required: true },
  soilType: { type: String, required: false },
  farmersNeeded: { type: Number, required: false },
  minLandPerFarmer: { type: Number, required: false },
  experienceRequired: { type: String, enum: ["Yes", "No"], required: false },
  seedsRequired: { type: String, required: false },
  fertilizerPlan: { type: String, required: false },
  equipmentRequired: { type: String, required: false },
  yieldPerAcre: { type: Number, required: false },
  sellingPrice: { type: Number, required: false },
  costPerAcre: { type: Number, required: false },
  description: { type: String, required: false },
  mentorGuidance: { type: String, enum: ["Yes", "No"], required: false },
  investmentRequired: { type: Number, required: false },
  additionalNotes: { type: String, required: false },
}, { timestamps: true });

const CreateRoom = mongoose.model("CreateRoom", createRoomSchema);

export default CreateRoom;
