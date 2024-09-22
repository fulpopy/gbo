import axios from "axios";
import { formatOrderToApi } from "../utils";

const URL = "http://localhost:3001";
export const login = async (user) => {
  try {
    let res = await axios.post(`${URL}/api/auth/signin`, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (user) => {
  try {
    let res = await axios.post(`${URL}/api/auth/signup`, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getKarigars = async () => {
  const token = localStorage.getItem("accessToken");
  const header = {
    headers: { "x-access-token": token },
  };
  try {
    let res = await axios.get(`${URL}/api/karigars`, header);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addKarigars = async (karigar) => {
  const token = localStorage.getItem("accessToken");
  const header = {
    headers: { "x-access-token": token },
  };
  try {
    let res = await axios.post(`${URL}/api/karigars`, karigar, header);
    return res;
  } catch (error) {
    console.log(error.message);
    return { status: 400 };
  }
};

export const updateKarigars = async (karigar) => {
  const token = localStorage.getItem("accessToken");
  const header = {
    headers: { "x-access-token": token },
  };
  console.log(karigar);
  try {
    let res = await axios.put(
      `${URL}/api/karigars/${karigar.id}`,
      karigar,
      header
    );
    return res;
  } catch (error) {
    console.log(error.message);
    return { status: 400 };
  }
};

export const deleteKarigars = async (id) => {
  const token = localStorage.getItem("accessToken");
  const header = {
    headers: { "x-access-token": token },
  };
  try {
    console.log(id);
    let res = await axios.delete(`${URL}/api/karigars/${id}`, header);
    return res;
  } catch (error) {
    console.log(error.message);
    return { status: 400 };
  }
};

export const getOrders = async () => {
  const token = localStorage.getItem("accessToken");
  const header = {
    headers: { "x-access-token": token },
  };
  try {
    let res = await axios.get(`${URL}/api/orders`, header);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const uploadImagesYoS3 = async (images) => {
  // const token = localStorage.getItem("accessToken");
  // const header = {
  //   headers: { "x-access-token": token },
  // };
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await axios.post(`${URL}/api/images/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Image URLs:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

export const addOrders = async (newOrder, user) => {
  const token = localStorage.getItem("accessToken");
  const header = {
    headers: { "x-access-token": token },
  };
  console.log(newOrder, user);
  try {
    let res = await axios.post(
      `${URL}/api/orders`,
      formatOrderToApi(newOrder, user),
      header
    );
    return res;
  } catch (error) {
    console.log(error.message);
    return { status: 400 };
  }
};
