import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import {
  FaSeedling,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaLeaf,
  FaTag,
} from "react-icons/fa";
import FilterComponent from "../Template/FilterBar";

const ExploreMentorPlans = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [filters, setFilters] = useState({
    cropType: "",
    region: "",
    harvestTimeframe: "",
    maxInvestment: "",
  });

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/room/getrooms"
      );

      console.log("API Response:", data);

      if (Array.isArray(data.data)) {
        setRooms(data.data);
        setFilteredRooms(data.data);
      } else {
        console.error("Expected an array but got:", data.data);
        setRooms([]);
        setFilteredRooms([]);
      }
    } catch (error) {
      console.error("Error fetching rooms", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Apply Filter Logic
  useEffect(() => {
    if (!rooms.length) return; // Prevent filtering before data is fetched

    const filtered = rooms.filter((room) => {
      return (
        (filters.cropType
          ? room.cropType?.toLowerCase().includes(filters.cropType.toLowerCase())
          : true) &&
        (filters.region
          ? room.region?.toLowerCase().includes(filters.region.toLowerCase())
          : true) &&
        (filters.harvestTimeframe
          ? new Date(room.harvestDate).getMonth() + 1 ===
            Number(filters.harvestTimeframe)
          : true) &&
        (filters.maxInvestment
          ? room.investmentRequired <= Number(filters.maxInvestment)
          : true)
      );
    });

    setFilteredRooms(filtered);
  }, [filters, rooms]);

  return (
    <div className="p-6 min-h-screen">
           <h2 className="text-3xl font-bold text-center text-green-800 mb-8 flex items-center justify-center gap-2">
              <FaSeedling className="text-green-600" />
                Explore Mentor Plans
          </h2>

      {/* ✅ Pass setFilters instead of onFilterChange */}
      <FilterComponent filters={filters} setFilters={setFilters} />

      {/* Mentor Plans Display */}
      {loading ? (
        <p className="text-center text-gray-500">Loading mentor plans...</p>
      ) : filteredRooms.length === 0 ? (
        <p className="text-center text-gray-500">
          No mentor plans match the filters.
        </p>
      ) : (
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {filteredRooms.map((room, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow-md rounded-xl p-6 border-l-8 border-green-500 w-80 hover:shadow-lg transition-all duration-300 hover:border-green-700"
            >
              <h3 className="text-xl font-semibold text-green-800">
                {room.roomName}
              </h3>
              <div className="flex flex-col gap-2 mt-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaSeedling className="text-green-600" /> <strong>Crop:</strong>{" "}
                  {room.cropType || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" /> <strong>Region:</strong>{" "}
                  {room.region || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" /> <strong>Harvest:</strong>{" "}
                  {room.harvestDate
                    ? new Date(room.harvestDate).toDateString()
                    : "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-500" /> <strong>Investment:</strong>{" "}
                  ₹{room.investmentRequired || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaLeaf className="text-green-700" /> <strong>Yield:</strong>{" "}
                  {room.yieldPerAcre ? `${room.yieldPerAcre} per acre` : "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaTag className="text-purple-500" /> <strong>Price:</strong>{" "}
                  ₹{room.sellingPrice || "N/A"} per unit
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreMentorPlans;
