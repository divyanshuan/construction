import { useState, useEffect } from "react";
import Modal from "./Modal";
const AddEditHouseModal = ({
  isOpen,
  onClose,
  house,
  onSave,
  villages = [],
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    village_id: "",
  });

  useEffect(() => {
    if (house) {
      setFormData({
        title: house.title || "",
        description: house.description || "",
        village_id: house.village_id || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        village_id: "",
      });
    }
  }, [house]);

  const handleSubmit = () => {
    if (!formData.village_id) {
      alert("Please select a village.");
      return;
    }
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={house ? "Edit House" : "Add House"}
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="House Title"
          className="w-full border rounded p-2"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <select
          className="w-full border rounded p-2"
          value={formData.village_id}
          onChange={(e) =>
            setFormData({ ...formData, village_id: parseInt(e.target.value) })
          }
        >
          <option value="">Select Village</option>
          {villages.map((v) => (
            <option key={v.village_id} value={v.village_id}>
              {v.name}
            </option>
          ))}
        </select>

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
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {house ? "Update House" : "Add House"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditHouseModal;
