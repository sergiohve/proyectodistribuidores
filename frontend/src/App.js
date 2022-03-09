import { useRoutes } from "react-router-dom";
import { useReducer, useEffect } from "react";
import { AuthContext } from "./auth/authContext";
import Themeroutes from "./routes/Router";
import { authReducer } from "./auth/authReducer";
import { useState } from "react/cjs/react.development";
import roles from "./helpers/roles";

const rolusuario=[
  {
    id: 1,
    email: "eddsonh@gmail.com",
    role: roles.empleado

},
{
  id: 2,
  email: "alysmaralejandra@gmail.com",
  role: roles.empleador

},
{

}
]


const init =()=>{
  return JSON.parse(localStorage.getItem("email")) || {logged: false};
}
const App = () => {
  const routing = useRoutes(Themeroutes);
 const [email, dispatch]= useReducer(authReducer, {}, init);
 const [user, setUser]=useState({})
 useEffect(()=>{
   if(!email){
     return;
   }
   localStorage.setItem("email", JSON.stringify(email))
 }, [email])
  return (
    <AuthContext.Provider value={
      {
        email,
       dispatch,
       user,
       rolusuario
      }
    }>
       <div>{routing}</div>
    </AuthContext.Provider>
  
  );
};

export default App;
