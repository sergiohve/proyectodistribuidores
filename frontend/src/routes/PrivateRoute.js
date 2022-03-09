import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";


export const PrivateRoute=({children})=> {
  
    const {email}= useContext(AuthContext);
    console.log(email)
    return email.logged ? children :   <Navigate to="/login"/>
}

