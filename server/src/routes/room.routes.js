import express from "express";  
import { createNewRoom, getAllRooms } from "../controllers/room.controller.js";

const router = express.Router(); 

// ✅ Create a new room
router.post("/create", createNewRoom);

// ✅ Fetch all rooms
router.get("/getrooms", getAllRooms);

export default router;
