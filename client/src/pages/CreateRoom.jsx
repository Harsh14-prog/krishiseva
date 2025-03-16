import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateRoom = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/rooms/create", data);
      alert("Room Created Successfully");
      navigate("/mentor");
    } catch (error) {
      console.error("Error creating room", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Create Mentor Room</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4">
        <div>
          <label className="block font-medium">Room Name</label>
          <input type="text" {...register("roomName", { required: "Room name is required" })} className="w-full border p-2 rounded" />
          {errors.roomName && <p className="text-red-500 text-sm">{errors.roomName.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Region/Location</label>
          <select {...register("region")} className="w-full border p-2 rounded">
            <option value="">Select Region</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Punjab">Punjab</option>
            <option value="UP">Uttar Pradesh</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Crop Type</label>
          <select {...register("cropType")} className="w-full border p-2 rounded">
            <option value="">Select Crop</option>
            <option value="Wheat">Wheat</option>
            <option value="Rice">Rice</option>
            <option value="Maize">Maize</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Expected Harvest Date</label>
          <input type="date" {...register("harvestDate", { required: "Harvest date is required" })} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Total Farming Area (Acres)</label>
          <input type="number" {...register("farmingArea", { required: "Total farming area is required" })} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Soil Type</label>
          <select {...register("soilType")} className="w-full border p-2 rounded">
            <option value="">Select Soil Type</option>
            <option value="Clay">Clay</option>
            <option value="Loam">Loam</option>
            <option value="Sandy">Sandy</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Number of Farmers Needed</label>
          <input type="number" {...register("farmersNeeded")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Minimum Land Required per Farmer</label>
          <input type="number" {...register("minLandPerFarmer")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Previous Experience Required?</label>
          <select {...register("experienceRequired")} className="w-full border p-2 rounded">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Type & Quantity of Seeds Required</label>
          <input type="text" {...register("seedsRequired")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Fertilizer & Pesticide Plan</label>
          <textarea {...register("fertilizerPlan")} className="w-full border p-2 rounded"></textarea>
        </div>

        <div>
          <label className="block font-medium">Equipment Required</label>
          <textarea {...register("equipmentRequired")} className="w-full border p-2 rounded"></textarea>
        </div>

        <div>
          <label className="block font-medium">Estimated Yield Per Acre</label>
          <input type="number" {...register("yieldPerAcre")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Predicted Selling Price (Per kg/ton)</label>
          <input type="number" {...register("sellingPrice")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Cost of Production Per Acre</label>
          <input type="number" {...register("costPerAcre")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Room Description</label>
          <textarea {...register("description")} className="w-full border p-2 rounded"></textarea>
        </div>

        <div>
          <label className="block font-medium">Mentor's Guidance Available?</label>
          <select {...register("mentorGuidance")} className="w-full border p-2 rounded">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Expected Investment Required</label>
          <input type="number" {...register("investmentRequired")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Additional Notes</label>
          <textarea {...register("additionalNotes")} className="w-full border p-2 rounded"></textarea>
        </div>

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
  );
};

export default CreateRoom;
