import roles from "../helpers/roles";
import { types } from "../types/types";

/*const state={
    name: "Sergio",
    logged: true
}*/

export const authReducer = (state={}, action)=>{
    switch (action.type) {
        case types.login:
            return{
              ...action.payload,
              logged: true,
              role: roles.empleado
            }
            case types.logout:
            return{
              logged: false
            }
            
    
        default:
            return state;
    }
}