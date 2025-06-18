import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Modal from "../components/Modal";
import UploadVillageFileModal from "../components/UploadVillageFileModal";
import EditVillageModal from "../components/EditVillageModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const VillagePage = () => {
  const [villages, setVillages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isFileModalOpen, setFileModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    description: "",
  });

  const fetchVillages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/village/getall`);
      setVillages(res.data.villages);
    } catch (err) {
      setError("Failed to fetch villages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${baseUrl}/api/users/auth`, {
          withCredentials: true,
        });
        fetchVillages();
      } catch (err) {
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);

  const handleAddVillage = async () => {
    try {
      await axios.post(`${baseUrl}/api/village/create`, formData, {
        withCredentials: true,
      });
      setFormData({ name: "", pin: "", description: "" });
      setAddModalOpen(false);
      fetchVillages();
    } catch (err) {
      alert("Failed to add village");
    }
  };

  const handleEditVillage = async (updatedData) => {
    try {
      await axios.put(
        `${baseUrl}/api/village/${selectedVillage.village_id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      setEditModalOpen(false);
      setSelectedVillage(null);
      fetchVillages();
    } catch (err) {
      alert("Failed to update village");
    }
  };

  const handleDeleteVillage = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/village/${selectedVillage.village_id}`,
        {
          withCredentials: true,
        }
      );
      setConfirmOpen(false);
      setSelectedVillage(null);
      fetchVillages();
    } catch (err) {
      alert("Failed to delete village");
    }
  };

  const filteredVillages = villages.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4">
      <div className="min-h-[90vh] mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
        {/* Add Village Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Add New Village"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Village Name"
              className="w-full border rounded p-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="PIN Code"
              className="w-full border rounded p-2"
              value={formData.pin}
              onChange={(e) =>
                setFormData({ ...formData, pin: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="w-full border rounded p-2"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="text-center">
              <button
                onClick={handleAddVillage}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add Village
              </button>
            </div>
          </div>
        </Modal>

        {/* Edit Modal */}
        <EditVillageModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          village={selectedVillage}
          onSave={handleEditVillage}
        />

        {/* File Upload Modal */}
        <UploadVillageFileModal
          isOpen={isFileModalOpen}
          onClose={() => setFileModalOpen(false)}
          village={selectedVillage}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDeleteVillage}
          title="Delete Village"
          message="Are you sure you want to delete this village?"
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-700">Manage Villages</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by name"
              className="px-4 py-2 rounded-md border border-gray-300 shadow-sm  text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md shadow-sm transition"
            >
              <PlusIcon className="h-4 w-4" />
              Add Village
            </button>
          </div>
        </div>

        {/* Village Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading villages...
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : filteredVillages.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No villages found
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">PIN</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredVillages.map((village) => (
                  <tr
                    key={village.village_id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-4 py-3 font-medium">{village.name}</td>
                    <td className="px-4 py-3">{village.pin}</td>
                    <td className="px-4 py-3">{village.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedVillage(village);
                            setFileModalOpen(true);
                          }}
                          className="rounded-md p-1.5 hover:bg-blue-100"
                          title="Add/View Files"
                        >
                          <CameraIcon className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedVillage(village);
                            setEditModalOpen(true);
                          }}
                          className="rounded-md p-1.5 hover:bg-yellow-100"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4 text-yellow-500" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedVillage(village);
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
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default VillagePage;
