import { lazy } from "react";
import { Navigate } from "react-router-dom";
import roles from "../helpers/roles.js";
import { PrivateRoute } from "./PrivateRoute.js";
import { PublicRoute } from "./PublicRoute.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const Login = lazy(() => import("../Login.js"));
const Registro = lazy(() => import("../Registro.js"));
/***** Pages ****/

const Publicaempleo = lazy(() => import("../views/Publicaempleo.js"));

const Todosempleos = lazy(() => import("../views/ui/Todosempleos"));

const Empleospublicados = lazy(() => import("../views/ui/Empleospublicados"));

const Suscripciones = lazy(() => import("../views/ui/Suscripciones"));


/*****Routes******/


const ThemeRoutes = [
 
  {
    path: "/registro",
    element: <PublicRoute><Registro /></PublicRoute>,
  },
  {
    path: "/login",
    exact: true,
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/",exact: true, element: <Navigate to="/empleo" /> },
      { path: "/empleo", exact: true, element: <PrivateRoute ><Publicaempleo /> </PrivateRoute> },
      { path: "/todosempleos", exact: true, 
      element: <PrivateRoute><Todosempleos /></PrivateRoute> 
        },
      { path: "/empleospublicados", exact: true, element: <PrivateRoute><Empleospublicados /> </PrivateRoute> },
   
      { path: "/suscripciones", exact: true, element:  <PrivateRoute><Suscripciones /> </PrivateRoute> },

    ],
  
  },
];

export default ThemeRoutes;
