import express from "express";
import Mentor from "../models/Mentor.js";

const router = express.Router();

// ✅ Check if a mentor profile exists
router.get("/check-profile/:userId", async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ userId: req.params.userId });
    res.status(200).json({ exists: !!mentor });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Create a mentor profile
router.post("/create", async (req, res) => {
  try {
    const { name, experience, expertise, contact, userId } = req.body;

    if (!name || !experience || !expertise || !contact || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingMentor = await Mentor.findOne({ userId });
    if (existingMentor) {
      return res.status(400).json({ error: "Mentor profile already exists" });
    }

    const mentor = new Mentor({ name, experience, expertise, contact, userId });
    await mentor.save();

    res.status(201).json({ message: "Mentor profile created successfully!", mentor });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
