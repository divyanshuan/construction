import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { baseUrl } from "../utils/baseUrl";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const UploadVillageFileModal = ({ isOpen, onClose, village }) => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    if (village) fetchFiles();
  }, [village]);

  // Reset files when modal closes
  useEffect(() => {
    if (!isOpen) setFiles([]);
  }, [isOpen]);

  const fetchFiles = async () => {
    const res = await axios.get(
      `${baseUrl}/api/files/village/${village.village_id}`
    );
    setUploadedFiles(res.data.files || []);
  };

  const handleUpload = async () => {
    if (!files.length) return alert("Please select a file!");

    const formData = new FormData();
    for (let f of files) formData.append("files", f);

    try {
      await axios.post(
        `${baseUrl}/api/files/village/${village.village_id}/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFiles([]);
      fetchFiles();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed!");
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`${baseUrl}/api/files/${fileId}`, {
        withCredentials: true,
      });
      fetchFiles();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Delete failed!");
    }
  };

  const removeSelectedFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setFiles([]);
      }}
      title={`Manage Files - ${village?.name}`}
      big={true}
    >
      <div className="space-y-4">
        {/* Drop Zone */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition">
          <input
            type="file"
            multiple
            id="fileUpload"
            onChange={(e) => setFiles([...e.target.files])}
            className="hidden"
          />
          <label htmlFor="fileUpload" className="cursor-pointer text-gray-600">
            <div className="flex flex-col items-center gap-2">
              <ArrowUpTrayIcon className="w-10 h-10 text-blue-500" />
              <p className="text-sm">
                Drag and Drop file here or{" "}
                <span className="text-blue-600 font-semibold">Choose file</span>
              </p>
              <p className="text-xs text-gray-400">
                Supported: JPG, PNG, MP4 | Max size: 25MB
              </p>
            </div>
          </label>
        </div>

        {/* Selected Files Preview */}
        {files.length > 0 && (
          <div className="border rounded p-3 bg-white shadow-sm">
            <h4 className="font-semibold text-sm mb-2 text-gray-600">
              Files to Upload:
            </h4>
            <div className="flex gap-3 overflow-x-auto max-w-full pb-2">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-center justify-center bg-gray-100 px-3 py-2 rounded min-w-[140px] max-w-[160px] text-sm text-gray-700"
                >
                  <span className="truncate w-full text-center">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeSelectedFile(idx)}
                    className="absolute top-1 right-1 text-gray-500 hover:text-red-600"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Upload
        </button>
        {/* Image & Video Preview Row */}
        {uploadedFiles.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Uploaded Files
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.file_id}
                  className="relative group w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border bg-black"
                >
                  {file.file_type.startsWith("image/") ? (
                    <img
                      src={`${baseUrl}/${file.file_path}`}
                      alt="preview"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : file.file_type.startsWith("video/") ? (
                    <video
                      src={`${baseUrl}/${file.file_path}`}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-xs text-gray-500 bg-white">
                      Unsupported
                    </div>
                  )}
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(file.file_id)}
                    className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hidden group-hover:block"
                  >
                    <TrashIcon className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UploadVillageFileModal;
