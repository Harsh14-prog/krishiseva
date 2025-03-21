import { useState } from "react";
import React from "react";
import { Agriculture, LocationOn, AttachMoney, RestartAlt } from "@mui/icons-material"; // Importing MUI icons

const FilterBar = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-wrap gap-4 items-center justify-between border border-gray-200">
      {/* Crop Type Dropdown */}
      <div className="relative w-64">
        <Agriculture className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
        <select
          name="cropType"
          value={filters.cropType}
          onChange={handleInputChange}
          className="pl-12 pr-10 py-2 w-full border border-green-500 rounded-xl shadow-md focus:border-green-600 focus:ring focus:ring-green-300 transition-all duration-300"
        >
          <option value="">Select Crop Type</option>
          <option value="Wheat">Wheat</option>
          <option value="Rice">Rice</option>
          <option value="Cotton">Cotton</option>
          <option value="Sugarcane">Sugarcane</option>
          <option value="Black Pepper">Black Pepper</option>
          <option value="Maize">Maize</option>
          <option value="Soybean">Soybean</option>
        </select>
      </div>

      {/* Region Dropdown */}
      <div className="relative w-64">
        <LocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
        <select
          name="region"
          value={filters.region}
          onChange={handleInputChange}
          className="pl-12 pr-10 py-2 w-full border border-green-500 rounded-xl shadow-md focus:border-green-600 focus:ring focus:ring-green-300 transition-all duration-300"
        >
          <option value="">Select Region</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Punjab">Punjab</option>
          <option value="Telangana">Telangana</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Kerala">Kerala</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>
      </div>

      {/* Max Investment Input */}
      <div className="relative w-64">
        <AttachMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
        <input
          type="number"
          name="maxInvestment"
          placeholder="Max Investment ₹"
          value={filters.maxInvestment}
          onChange={handleInputChange}
          className="pl-12 pr-4 py-2 w-full border border-green-500 rounded-xl shadow-md focus:border-green-600 focus:ring focus:ring-green-300 transition-all duration-300"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={() => setFilters({ cropType: "", region: "", maxInvestment: "" })}
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all duration-300 shadow-md ml-3"
      >
        <RestartAlt />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};

export default FilterBar;
