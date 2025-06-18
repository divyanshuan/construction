import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { TrashIcon } from "@heroicons/react/24/solid";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const FilePage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const fetchAllFiles = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/files/all`, {
        withCredentials: true,
      });
      setFiles(res.data.files || []);
    } catch (err) {
      console.error("Failed to fetch files", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/api/files/${selectedFile.file_id}`, {
        withCredentials: true,
      });
      setConfirmOpen(false);
      setSelectedFile(null);
      fetchAllFiles();
    } catch (err) {
      alert("Failed to delete file");
    }
  };

  const confirmDelete = (file) => {
    setSelectedFile(file);
    setConfirmOpen(true);
  };

  const renderMedia = (file) => {
    const fileUrl = `${baseUrl}/${file.file_path}`;
    if (file.file_type?.startsWith("image")) {
      return (
        <img
          src={fileUrl}
          alt="preview"
          className="w-full h-48 object-cover rounded-md"
        />
      );
    } else if (file.file_type?.startsWith("video")) {
      return (
        <video src={fileUrl} controls className="w-full h-48 rounded-md" />
      );
    } else {
      return (
        <div className="h-48 flex items-center justify-center text-gray-500 text-sm">
          Unsupported File
        </div>
      );
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-700">All Uploaded Files</h1>

        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />

        {files.length === 0 ? (
          <div className="text-center text-gray-500">No files found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {files.map((file) => (
              <div
                key={file.file_id}
                className="relative bg-gray-100 rounded-lg shadow hover:shadow-md transition"
              >
                {renderMedia(file)}
                <button
                  onClick={() => confirmDelete(file)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-red-100"
                >
                  <TrashIcon className="h-5 w-5 text-red-600" />
                </button>
                <div className="px-4 py-2 text-sm text-gray-500 truncate">
                  {file.file_path.split("/").pop()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePage;
