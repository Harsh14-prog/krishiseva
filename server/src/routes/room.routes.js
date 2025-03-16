import Router from "express";
import { createNewRoom } from "../controllers/room.controller.js";

const router = Router()

router.route("/create").post(createNewRoom)

export default router ;