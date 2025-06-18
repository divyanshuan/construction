import React from "react";
import Modal from "./Modal";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <div className="text-center space-y-4">
        <p>Are you sure you want to delete this village?</p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
