import axios from "../axios/index";

export const donorGroup = {
  getAllDonorGroup,
  setDonorGroup,
  updateDonorGroup,
  deleteDonorGroup
};

function getAllDonorGroup() {
  return axios.get("/all_donor_groups");
}

function setDonorGroup(donorGroup) {
  return axios.post("/donor_group/add", donorGroup);
}

function updateDonorGroup(donorGroup) {
  return axios.put("/donor_group/update", donorGroup);
}

function deleteDonorGroup(item){
  return axios.delete("/donor_group/delete/"+item);
}