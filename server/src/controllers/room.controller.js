import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import CreateRoom from "../models/createRoomSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createNewRoom = asyncHandler(async (req, res) => {
    const { roomName, region, cropType, harvestDate, farmingArea, soilType,
        farmersNeeded, minLandPerFarmer, experienceRequired, seedsRequired,
        fertilizerPlan, equipmentRequired, yieldPerAcre, sellingPrice, costPerAcre,
        description, mentorGuidance, investmentRequired, additionalNotes } = req.body;

    
        if ([roomName, harvestDate, farmingArea].some(field => !field || (typeof field === "string" && field.trim() === ""))) {
            throw new ApiError(400, "Room Name, Harvest Date, and Farming Area are required");
        }
        

    
    const existingRoom = await CreateRoom.findOne({ roomName });
    if (existingRoom) {
        throw new ApiError(400, "A room with this name already exists");
    }

    
    const createdRoom = await CreateRoom.create({
        roomName, region, cropType, harvestDate, farmingArea, soilType,
        farmersNeeded, minLandPerFarmer, experienceRequired, seedsRequired,
        fertilizerPlan, equipmentRequired, yieldPerAcre, sellingPrice, costPerAcre,
        description, mentorGuidance, investmentRequired, additionalNotes
    });

    if (!createdRoom) {
        throw new ApiError(500, "Something went wrong while creating the room");
    }

    
    res.status(201).json(new ApiResponse(201, createdRoom, "Room Created Successfully"));
});

export { createNewRoom }; 
