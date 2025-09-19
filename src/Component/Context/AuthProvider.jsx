import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";


const AuthProvider = ({ children }) => {
    const [user , setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
 

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const signInWithGoogle = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const  loginWithPassword =(email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email , password);
    }

   const signOutUser = () => {
       setLoading(true);
    return signOut(auth);
   }


    useEffect(() => {
        const unSubscribe =onAuthStateChanged(auth , currentUser => {
            // console.log('Current User inside useEffect on auth state change ', currentUser);
            setUser(currentUser);
            //   if (currentUser) {
            //     axiosPublic.post('/add-user', {
            //         email: currentUser.email,
            //         role: "user",
            //         loginCount: 1,
            //     }).then((res) => {
            //         setUser(currentUser);
            //         console.log(res.data);
            //     });
            // }
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])


    const userInfo = {
        user,
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