import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";


export const PublicRoute=({children})=> {
  
    const {email}= useContext(AuthContext);
    console.log(email)
    return email.logged ? <Navigate to="/todosempleos"/> : children
}

