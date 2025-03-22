import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const CreateRoom = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      const userId = localStorage.getItem("userId"); // Get user ID from localStorage
      try {
        const response = await axios.get(`http://localhost:8080/api/mentors/check-profile/${userId}`);
        if (!response.data.exists) {
          navigate("/mentor-profile"); // Redirect if profile doesn't exist
        }
      } catch (error) {
        console.error("Error checking mentor profile:", error);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8080/api/rooms/create", data);
      alert("Room Created Successfully");
      navigate("/mentor-dashboard");
    } catch (error) {
      console.error("Error creating room", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Create Mentor Room</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Room Name */}
          <div>
            <label className="block font-medium">Room Name</label>
            <input type="text" {...register("roomName", { required: "Room name is required" })} className="w-full border p-2 rounded" />
            {errors.roomName && <p className="text-red-500 text-sm">{errors.roomName.message}</p>}
          </div>

          {/* Region/Location */}
          <div>
            <label className="block font-medium">Region/Location</label>
            <select {...register("region")} className="w-full border p-2 rounded">
              <option value="">Select Region</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="UP">Uttar Pradesh</option>
            </select>
          </div>

          {/* Crop Type */}
          <div>
            <label className="block font-medium">Crop Type</label>
            <select {...register("cropType")} className="w-full border p-2 rounded">
              <option value="">Select Crop</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Maize">Maize</option>
            </select>
          </div>

          {/* Harvest Date */}
          <div>
            <label className="block font-medium">Expected Harvest Date</label>
            <input type="date" {...register("harvestDate", { required: "Harvest date is required" })} className="w-full border p-2 rounded" />
          </div>

          {/* Farming Area */}
          <div>
            <label className="block font-medium">Total Farming Area (Acres)</label>
            <input type="number" {...register("farmingArea", { required: "Total farming area is required" })} className="w-full border p-2 rounded" />
          </div>

          {/* Soil Type */}
          <div>
            <label className="block font-medium">Soil Type</label>
            <select {...register("soilType")} className="w-full border p-2 rounded">
              <option value="">Select Soil Type</option>
              <option value="Clay">Clay</option>
              <option value="Loam">Loam</option>
              <option value="Sandy">Sandy</option>
            </select>
          </div>

          {/* Number of Farmers Needed */}
          <div>
            <label className="block font-medium">Number of Farmers Needed</label>
            <input type="number" {...register("farmersNeeded")} className="w-full border p-2 rounded" />
          </div>

          {/* Minimum Land Per Farmer */}
          <div>
            <label className="block font-medium">Minimum Land Required per Farmer</label>
            <input type="number" {...register("minLandPerFarmer")} className="w-full border p-2 rounded" />
          </div>

          {/* Experience Required */}
          <div>
            <label className="block font-medium">Previous Experience Required?</label>
            <select {...register("experienceRequired")} className="w-full border p-2 rounded">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Seeds Required */}
          <div>
            <label className="block font-medium">Type & Quantity of Seeds Required</label>
            <input type="text" {...register("seedsRequired")} className="w-full border p-2 rounded" />
          </div>

          {/* Fertilizer Plan */}
          <div>
            <label className="block font-medium">Fertilizer & Pesticide Plan</label>
            <textarea {...register("fertilizerPlan")} className="w-full border p-2 rounded"></textarea>
          </div>

          {/* Equipment Required */}
          <div>
            <label className="block font-medium">Equipment Required</label>
            <textarea {...register("equipmentRequired")} className="w-full border p-2 rounded"></textarea>
          </div>

          {/* Estimated Yield Per Acre */}
          <div>
            <label className="block font-medium">Estimated Yield Per Acre</label>
            <input type="number" {...register("yieldPerAcre")} className="w-full border p-2 rounded" />
          </div>

          {/* Selling Price */}
          <div>
            <label className="block font-medium">Predicted Selling Price (Per kg/ton)</label>
            <input type="number" {...register("sellingPrice")} className="w-full border p-2 rounded" />
          </div>

          {/* Cost Per Acre */}
          <div>
            <label className="block font-medium">Cost of Production Per Acre</label>
            <input type="number" {...register("costPerAcre")} className="w-full border p-2 rounded" />
          </div>

          {/* Room Description */}
          <div>
            <label className="block font-medium">Room Description</label>
            <textarea {...register("description")} className="w-full border p-2 rounded"></textarea>
          </div>

          {/* Mentor Guidance */}
          <div>
            <label className="block font-medium">Mentor's Guidance Available?</label>
            <select {...register("mentorGuidance")} className="w-full border p-2 rounded">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Investment Required */}
          <div>
            <label className="block font-medium">Expected Investment Required</label>
            <input type="number" {...register("investmentRequired")} className="w-full border p-2 rounded" />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => navigate("/mentor")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
