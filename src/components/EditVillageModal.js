import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const EditVillageModal = ({ isOpen, onClose, village, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    description: "",
  });

  useEffect(() => {
    if (village) {
      setFormData({
        name: village.name || "",
        pin: village.pin || "",
        description: village.description || "",
      });
    }
  }, [village]);

  const handleSave = () => {
    if (!formData.name || !formData.pin) return;
    onSave(formData);
  };
  if (!village) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Village">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Village Name"
          className="w-full border rounded p-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="PIN Code"
          className="w-full border rounded p-2"
          value={formData.pin}
          onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full border rounded p-2"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="w-1/3 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditVillageModal;
