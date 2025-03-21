import Router from "express";
import { createNewRoom, getAllRooms } from "../controllers/room.controller.js";

const router = Router();

router.route("/create").post(createNewRoom);  // POST - Create a room
router.route("/getrooms").get(getAllRooms);  // GET - Fetch all rooms

export default router;
