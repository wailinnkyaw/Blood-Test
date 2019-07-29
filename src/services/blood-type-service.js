import axios from "../axios/index";

export const bloodType = {      
  getAllBloodType,
  saveBloodType,
  updateBloodType
};

function getAllBloodType() {
  return axios.get("/all-blood-type");
}

function saveBloodType(bloodType) {
    return axios.post("/blood-type",bloodType);
}

function updateBloodType(updatedBloodType) {
    return axios.post("/blood-type",updatedBloodType);
}
