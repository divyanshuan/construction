import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import AddEditHouseModal from "../../components/AddEditHouseModal";
import UploadHouseFileModal from "../../components/UploadHouseFileModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const HousePage = () => {
  const [houses, setHouses] = useState([]);
  const [villages, setVillages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isAddEditOpen, setAddEditOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const fetchHouses = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/house/getall`);
      setHouses(res.data.houses);
    } catch (err) {
      console.error("Failed to fetch houses", err);
    }
  };

  const fetchVillages = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/village/getall`);
      setVillages(res.data.villages);
    } catch (err) {
      console.error("Failed to fetch villages", err);
    }
  };

  useEffect(() => {
    fetchVillages();
    fetchHouses();
  }, []);

  const handleSaveHouse = async (data) => {
    try {
      if (selectedHouse) {
        await axios.put(
          `${baseUrl}/api/house/${selectedHouse.house_id}`,
          data,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post(
          `${baseUrl}/api/house/create/${data.village_id}`,
          data,
          {
            withCredentials: true,
          }
        );
      }
      setAddEditOpen(false);
      setSelectedHouse(null);
      fetchHouses();
    } catch (err) {
      alert("Failed to save house");
    }
  };

  const handleDeleteHouse = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/house/delete/${selectedHouse.house_id}`,
        {
          withCredentials: true,
        }
      );
      setConfirmOpen(false);
      setSelectedHouse(null);
      fetchHouses();
    } catch (err) {
      alert("Failed to delete house");
    }
  };

  const filteredHouses = houses.filter((h) =>
    h.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4">
      <div className="min-h-[90vh] mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <AddEditHouseModal
          isOpen={isAddEditOpen}
          onClose={() => {
            setAddEditOpen(false);
            setSelectedHouse(null);
          }}
          house={selectedHouse}
          onSave={handleSaveHouse}
          villages={villages} // 👈 pass the villages here
        />

        <UploadHouseFileModal
          isOpen={isUploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          house={selectedHouse}
        />

        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDeleteHouse}
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-700">Manage Houses</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by title"
              className="px-4 py-2 rounded-md border border-gray-300 shadow-sm  text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setAddEditOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md shadow-sm transition"
            >
              <PlusIcon className="h-4 w-4" />
              Add House
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
          {filteredHouses.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No houses found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Village</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredHouses.map((house) => {
                  const village = villages.find(
                    (v) => v.village_id === house.village_id
                  );
                  return (
                    <tr
                      key={house.house_id}
                      className="hover:bg-blue-50 transition duration-200"
                    >
                      <td className="px-4 py-3 font-medium">{house.title}</td>
                      <td className="px-4 py-3">{village?.name || "-"}</td>
                      <td className="px-4 py-3">{house.description}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedHouse(house);
                              setUploadModalOpen(true);
                            }}
                            className="rounded-md p-1.5 hover:bg-blue-100"
                            title="Manage Files"
                          >
                            <CameraIcon className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedHouse(house);
                              setAddEditOpen(true);
                            }}
                            className="rounded-md p-1.5 hover:bg-yellow-100"
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4 text-yellow-500" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedHouse(house);
                              setConfirmOpen(true);
                            }}
                            className="rounded-md p-1.5 hover:bg-red-100"
                            title="Delete"
                          >
                            <TrashIcon className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default HousePage;
