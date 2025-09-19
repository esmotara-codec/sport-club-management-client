import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const accessToken = user?.accessToken; 
  console.log("useAxiosSecure", accessToken);

  const instance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });

  return instance;
};
export default useAxiosSecure;