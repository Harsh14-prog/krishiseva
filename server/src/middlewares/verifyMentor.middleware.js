import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyMentor = asyncHandler(async (req, res, next) => {  
    if (req.user?.role !== "mentor") {
        throw new ApiError(403, "Access denied! Only mentors can perform this action");
    }
    next();  // Call next() if the user is a mentor
});

export { verifyMentor };
