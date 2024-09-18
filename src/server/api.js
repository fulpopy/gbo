import axios from "axios";
const token = localStorage.getItem("accessToken");
const header = {
  headers: { "x-access-token": token },
};

const URL = "http://localhost:3001";
export const login = async (user) => {
  try {
    const res = await axios.post(`${URL}/api/auth/signin`, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (user) => {
  try {
    const res = await axios.post(`${URL}/api/auth/signup`, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getKarigars = async () => {
  try {
    const res = await axios.get(`${URL}/api/karigars`, header);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addKarigars = async (karigar) => {
  try {
    const res = await axios.post(`${URL}/api/karigars`, karigar, header);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateKarigars = async (karigar) => {
  console.log(karigar);
  try {
    const res = await axios.put(
      `${URL}/api/karigars/${karigar.id}`,
      karigar,
      header
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteKarigars = async (id) => {
  try {
    console.log(id);
    const res = await axios.delete(`${URL}/api/karigars/${id}`, header);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
