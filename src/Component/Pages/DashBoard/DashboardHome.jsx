
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useRole from "../../hook/useRole";



export const DashboardHome = () => {
  const {role, loading }= useRole();
console.log(" dashboard role:", role);

if (loading) {
  return <div className="text-red-700 text-xl">Loading...</div>;
  
}

if(role === "admin") 
  return <Navigate to ="/dashboard/admin" />

  if(role === "user")
 return  <Navigate to ="/dashboard/user" /> 

  if(role === "member")
 return  <Navigate to="/dashboard/member" /> 


  return <Navigate to="/"  />; 
}
