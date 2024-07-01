import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user";
interface LoginData {
    name: string;
    password: string;
}

export const login = async (data: LoginData) => {
    const response = await axios.post(`${BASE_URL}/login`, data);
    return response.data;
};
