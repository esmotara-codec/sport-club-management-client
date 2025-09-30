import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hook/useAxiosPublic";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSigningUp, setIsSigningUp] = useState(false); 
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setIsSigningUp(true); 
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = (provider) => {
        return signInWithPopup(auth, provider);
    }

    const loginWithPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        setLoading(true);
        setUser(null);
        setIsSigningUp(false); 
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // IPrevent AuthProvider from auto-set user
            if (isSigningUp) {
                console.log('Sign-up in progress, skipping auto-auth');
                setLoading(false);
                return;
            }

            if (currentUser) {
                try {
                    const res = await axiosPublic.post('/add-user', {
                        email: currentUser.email,
                        role: "user",
                        loginCount: 1,
                    });
                    console.log(res.data);
                    setUser(currentUser);
                } catch (error) {
                    console.error('Error updating user in database:', error);
                    setUser(currentUser); 
                }
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            unSubscribe();
        };
    }, [axiosPublic, isSigningUp]); 

    const userInfo = {
        user,
        setUser,
        loading,
        createUser,
        signInWithGoogle,
        loginWithPassword,
        signOutUser,
        setIsSigningUp, 
    }

    return (
        <AuthContext value={userInfo}> 
            {children}
        </AuthContext>
    );
};

export default AuthProvider;