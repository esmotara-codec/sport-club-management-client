import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "./AuthContext";




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
        return signInWithEmailAndPassword(auth , email , password);
    }

   const signOutUser = () => {
       setLoading(true);
    return signOut(auth);
   }


    useEffect(() => {
        const unSubscribe =onAuthStateChanged(auth , currentUser => {
            // console.log('Current User inside useEffect on auth state change ', currentUser);
            setUser(currentUser);
            setLoading(false);
            // if(currentUser?.email){
            //     const userData = {email: currentUser.email};
            //     axios.post('https://food-expiry-server-lime.vercel.app/jwt', userData)
            //     .then(res =>{
            //         console.log(res.data)
            //     })
            //     .catch(error => console.log(error));                

            // }
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