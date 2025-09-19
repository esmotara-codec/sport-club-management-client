import React, { useEffect, useState } from 'react'
import useAxiosSecure from './asioxSecure'

export default function useRole() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  

  // Fetch user role from the server
  useEffect(() => {
    axiosSecure('/get-user-role')
      .then((res) => {
        console.log("Role API response:", res.data);
        setRole(res.data?.role);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch role", err);
        setLoading(false);
      });

  }, );


  return {role , loading};
}
