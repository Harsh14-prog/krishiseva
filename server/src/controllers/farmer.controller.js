import Farmer from "../models/Farmer.js";

// ✅ Get Farmer Profile
export const getFarmerProfile = async (req, res) => {
    try {
        const farmer = await Farmer.findOne({ email: req.user.email });
        if (!farmer) {
            return res.status(404).json({ profileComplete: false });
        }
        res.json({ profileComplete: true, farmer });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
};

// 
export const createFarmerProfile = async (req, res) => {
    try {
        const { fullName, mobile, aadhaar, dob, gender, language } = req.body;

        let farmer = await Farmer.findOne({ email: req.user.email });
        if (farmer) {
            return res.status(400).json({ message: "Profile already exists" });
        }

        farmer = new Farmer({
            fullName,
            mobile,
            aadhaar,
            dob,
            gender,
            language,
            email: req.user.email,
            profileCompleted: true, // ✅ Automatically setting profileCompleted to true
        });

        await farmer.save();

        res.json({ message: "Profile created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving profile" });
    }
};

// ✅ Update Farmer Profile
export const updateFarmerProfile = async (req, res) => {
    try {
        const { fullName, mobile, aadhaar, dob, gender, language } = req.body;

        let farmer = await Farmer.findOneAndUpdate(
            { email: req.user.email },
            { fullName, mobile, aadhaar, dob, gender, language },
            { new: true }
        );

        if (!farmer) {
            return res.status(404).json({ message: "Farmer profile not found" });
        }

        res.json({ message: "Profile updated successfully", farmer });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
};

