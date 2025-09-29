import axios from "axios";

const useAxiosPublic = () =>{
    const instance = axios.create({
        baseURL: "https://sport-club-management-server.vercel.app/",
    });

    return instance;

}
export default useAxiosPublic ; 