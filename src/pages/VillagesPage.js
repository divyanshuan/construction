import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { useNavigate } from "react-router-dom";

const VillagesPage = () => {
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/village/getallwithhouse`);
        console.log("Fetched villages:", res.data);
        setVillages(res.data.villages); // ✅ Fix is here
        setLoading(false);
      } catch (err) {
        console.error("Error fetching villages", err);
        setVillages([]);
        setLoading(false);
      }
    };
    fetchVillages();
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading villages...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          All Villages
        </h1>
        {villages.length === 0 ? (
          <p className="text-center text-gray-600">No villages available.</p>
        ) : (
          <div className="space-y-8">
            {villages.map((village) => (
              <div
                key={village.village_id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/village/${village.village_id}`)}
              >
                <h2 className="text-2xl font-semibold text-blue-600">
                  {village.name} ({village.pin})
                </h2>
                <p className="text-gray-600 mt-2 mb-4">
                  {village.description || "No description provided."}
                </p>

                {village.MediaFiles && village.MediaFiles.length > 0 && (
                  <div className="w-full h-48 overflow-hidden rounded-lg relative">
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {village.MediaFiles.map(
                        (file, index) =>
                          file.file_type?.includes("image") && (
                            <img
                              key={index}
                              src={`${baseUrl}/${file.file_path}`}
                              alt="village preview"
                              className="h-48 w-72 object-cover rounded shadow"
                            />
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VillagesPage;
