import axios from "axios";

export const domain =
  "https://checkyourproject.website/shaffshaw-trello/api/v1";

const token = localStorage.getItem("token");
console.log("token>>>>" , token);

export const userRequest = axios.create({
  baseURL: domain,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

//Users section
export const GET_USERS = domain + "/login";
export const REGISTER_USER = domain + "/register";
// export const UPDATE_USER = domain + "user/updateUser";
// export const DELETE_USER = domain + "user/deleteUser";
