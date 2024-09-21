import axios from "axios";
const token = localStorage.getItem("accessToken");
const header = {
  headers: { "x-access-token": token },
};

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
  try {
    let res = await axios.get(`${URL}/api/karigars`, header);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addKarigars = async (karigar) => {
  try {
    let res = await axios.post(`${URL}/api/karigars`, karigar, header);
    return res;
  } catch (error) {
    console.log(error.message);
    return { status: 400 };
  }
};

export const updateKarigars = async (karigar) => {
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
  try {
    let res = await axios.get(`${URL}/api/orders`, header);
    return res;
  } catch (err) {
    console.log(err);
  }
};
