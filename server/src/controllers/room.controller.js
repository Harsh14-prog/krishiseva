import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import CreateRoom from "../models/createRoomSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Create a room
const createNewRoom = asyncHandler(async (req, res) => {
    console.log("📩 Incoming Room Creation Request:", req.body); // Log request data

    const { roomName, harvestDate, farmingArea } = req.body;
    if (!roomName || !harvestDate || !farmingArea) {
        throw new ApiError(400, "Room Name, Harvest Date, and Farming Area are required");
    }

    const existingRoom = await CreateRoom.findOne({ roomName });
    if (existingRoom) {
        throw new ApiError(400, "A room with this name already exists");
    }

    const createdRoom = await CreateRoom.create(req.body);
    console.log("✅ Room saved in DB:", createdRoom); // Log saved room

    res.status(201).json(new ApiResponse(201, createdRoom, "Room Created Successfully"));
});

// ✅ Fetch all rooms
const getAllRooms = asyncHandler(async (req, res) => {
    console.log("📩 Fetching all rooms...");
    
    const rooms = await CreateRoom.find();
    if (!rooms || rooms.length === 0) {
        console.log("❌ No rooms found in DB");
        throw new ApiError(404, "No rooms found");
    }

    console.log("✅ Rooms found:", rooms.length);
    res.status(200).json(new ApiResponse(200, rooms, "All rooms fetched successfully"));
});

export { createNewRoom, getAllRooms };
