import axios from "axios";
export const login = async (username, password) => {
  try {
    const res = await axios.post("http://localhost:3001/api/auth/signin", {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
