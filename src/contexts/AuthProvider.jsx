import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const handleGoogleLoginUser = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const handleCreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleUpdateProfile = (profileData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profileData);
  };

  const handleLoginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogoutUser = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        Swal.fire({
          title: "Logout Successfully!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        toast.error("Error signing out:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    handleCreateUser,
    handleUpdateProfile,
    handleLoginUser,
    handleGoogleLoginUser,
    handleLogoutUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
