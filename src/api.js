import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Village APIs
export const fetchVillages = async () => {
  const response = await axios.get(`${API_URL}/village/getall`);
  return response.data.villages;
};

export const fetchVillageById = async (villageId) => {
  const response = await axios.get(`${API_URL}/village/${villageId}`);
  return response.data.village;
};

// House APIs
export const fetchHousesByVillage = async (villageId) => {
  const response = await axios.get(`${API_URL}/house/village/${villageId}`);
  return response.data.houses;
};

// File APIs
export const fetchFilesByVillage = async (villageId) => {
  const response = await axios.get(`${API_URL}/files/village/${villageId}`);
  return response.data.files;
};
export const fetchFilesByHouse = async (houseId) => {
  const response = await axios.get(`${API_URL}/files/house/${houseId}`);
  return response.data.files;
};
