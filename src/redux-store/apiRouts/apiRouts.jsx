import axios from "axios";

export const domain =
  "https://checkyourproject.website/shaffshaw-trello/api/v1";
export const domainForFile =
  "https://checkyourproject.website/shaffshaw-trello/public/";

const token = localStorage.getItem("token");

export const userRequest = axios.create({
  baseURL: domain,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const  userRequestForMultipart = axios.create({
  // baseURL: process.env.API_BASE_URL, // Change this to your API base URL
  // baseURL:" https://checkyourproject.website/angle-wishes/public/api/v1/auth" 
  baseURL: domain,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,

  },
});
//Users section
export const GET_USERS = domain + "/login";
export const REGISTER_USER = domain + "/register";
// export const UPDATE_USER = domain + "user/updateUser";
// export const DELETE_USER = domain + "user/deleteUser";
