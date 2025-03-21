import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import CreateRoom from "../models/createRoomSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// create room
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

// get all rooms
const getAllRooms = asyncHandler(async (req, res) => {
    const rooms = await CreateRoom.find();  // Fetch all rooms

    if (!rooms || rooms.length === 0) {
        throw new ApiError(404, "No rooms found");
    }

    res.status(200).json(new ApiResponse(200, rooms, "All rooms fetched successfully"));
});


export { createNewRoom , getAllRooms }; 
