import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getFarmerProfile,
    createFarmerProfile,
    updateFarmerProfile,
} from "../controllers/farmer.controller.js";

const router = express.Router();


router.get("/profile", verifyJWT, getFarmerProfile);

router.post("/create-profile", verifyJWT, createFarmerProfile);

router.put("/update-profile", verifyJWT, updateFarmerProfile);

export default router;
