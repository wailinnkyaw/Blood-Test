import axios from "../axios/index";

export const blood = {
  getBlood,
  setBlood,
  updateBlood
};

function getBlood() {
  return axios.get("/all_blood_types");
}

function setBlood(blood) {
  return axios.post("/blood_type/add", blood);
}

function updateBlood(blood) {
  return axios.put("/blood_type/update", blood);
}
