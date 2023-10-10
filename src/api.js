import axios from "axios";

const BASE_URL = "http://13.125.196.211:8080";

const signup = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/member/signup`, data);
    return res.data;
  } catch (err) {
    const statusCode = err.response.data.code;
    if (statusCode === 400) throw new Error("입력값들이 올바른지 확인해주세요");
  }
};

export { signup };
