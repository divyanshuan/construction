import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchVillageById,
  fetchHousesByVillage,
  fetchFilesByHouse,
} from "../api";
import { baseUrl } from "../utils/baseUrl";
import HouseGrid from "./HouseGrid";

const VillageDetailPage = () => {
  const { villageId } = useParams();
  const [village, setVillage] = useState(null);
  const [houses, setHouses] = useState([]);
  const [houseFiles, setHouseFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      if (!villageId) return;

      try {
        const [villageData, housesData] = await Promise.all([
          fetchVillageById(villageId),
          fetchHousesByVillage(villageId),
        ]);

        const fileMap = {};

        await Promise.all(
          housesData.map(async (house) => {
            const files = await fetchFilesByHouse(house.house_id);
            fileMap[house.house_id] = files || [];
          })
        );

        setVillage(villageData);
        setHouses(housesData);
        setHouseFiles(fileMap);
      } catch (err) {
        console.error("Failed to load village data:", err);
        setError("Something went wrong while loading village details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [villageId]);

  if (loading)
    return <p className="text-center p-6 text-lg font-medium">Loading...</p>;

  if (error) return <p className="text-center p-6 text-red-500">{error}</p>;

  if (!village)
    return <p className="text-center p-6 text-gray-500">Village not found.</p>;

  const gradientClasses = [
    "from-indigo-500 to-purple-600",
    "from-pink-500 to-red-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-lime-500",
    "from-orange-500 to-yellow-400",
  ];

  const randomGradient =
    gradientClasses[Math.floor(Math.random() * gradientClasses.length)];
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div
        className={`w-full relative bg-gradient-to-br ${randomGradient} rounded-3xl shadow-xl overflow-hidden`}
      >
        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl z-0" />

        {/* Glow Accents */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/20 rounded-full blur-3xl opacity-30 z-0" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/20 rounded-full blur-3xl opacity-30 z-0" />
        {/* Content */}
        <div className="relative z-10 text-white py-20 px-6 sm:px-20 text-center">
          <h1
            className="text-5xl sm:text-7xl font-extrabold uppercase tracking-widest"
            style={{
              textShadow:
                "0 0 6px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.3)",
            }}
          >
            {village.name}
          </h1>
        </div>
      </div>
      <div className="h-4"></div>
      {houses.length === 0 ? (
        <p className="text-center text-gray-500">No houses in this village.</p>
      ) : (
        <HouseGrid houses={houses} houseFiles={houseFiles} />
      )}
    </div>
  );
};

export default VillageDetailPage;
