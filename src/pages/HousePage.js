import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const allMembers = [
  {
    name: "Olivia Rhye",
    email: "olivia@lantern.com",
    lastActive: "23 Dec 2022",
    role: "Admin",
    status: "active",
  },
  {
    name: "Guy Hawkins",
    email: "guy@lantern.com",
    lastActive: "",
    role: "Read-only",
    status: "pending",
  },
  {
    name: "Theresa Webb",
    email: "theresa@lantern.com",
    lastActive: "",
    role: "Basic",
    status: "imported",
  },
  {
    name: "Esther Howard",
    email: "esther@lantern.com",
    lastActive: "",
    role: "Basic",
    status: "imported",
  },
];

const HousePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = allMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between my-6">
        <h1 className="text-2xl font-semibold">Villages</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Villages
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Last active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {member.name}
                  </div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {member.status === "pending" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending invite
                    </span>
                  ) : member.lastActive ? (
                    member.lastActive
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {member.role}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {member.status === "imported" ? (
                    <button className="text-indigo-600 font-medium hover:underline">
                      Send invite
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HousePage;
