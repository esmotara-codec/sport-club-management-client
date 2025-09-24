import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hook/useAxiosPublic";

const AuthProvider = ({ children }) => {
    const [user , setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const signInWithGoogle = (provider) => {   
        return signInWithPopup(auth, provider);
    }

    const  loginWithPassword =(email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email , password);
    }

   const signOutUser = () => {
       setLoading(true);
       setUser(null);
    return signOut(auth);
   }


    useEffect(() => {
        const unSubscribe =onAuthStateChanged(auth , currentUser => {
            // console.log('Current User inside useEffect on auth state change ', currentUser);
              if (currentUser) {
                axiosPublic.post('/add-user', {
                    email: currentUser.email,
                    role: "user",
                    loginCount: 1,
                }).then((res) => {
                    setUser(currentUser);
                    console.log(res.data);
                    setLoading(false);
                });
            }
            else{
                setUser(null);
                setLoading(false);
            }
            
        })
        return () => {
            unSubscribe();
        }
    }, [ axiosPublic])


    const userInfo = {
        user,
        setUser,
        loading,
        createUser,
        signInWithGoogle,
        loginWithPassword,
        signOutUser,
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;