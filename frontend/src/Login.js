import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import { Link } from "react-router-dom";
import { useForm } from "./hooks/useForm";
import axios from 'axios';

import { useEffect, useContext, useState } from "react";
import { Alert } from "bootstrap";
import { useNavigate } from 'react-router-dom';
import { types } from "./types/types";
import { AuthContext } from "./auth/authContext";
import roles from "./helpers/roles";




const Login = () => {
 
  const navigate = useNavigate();
  const {dispatch, rolusuario, email}=useContext(AuthContext);
  const [values, setValues] = useState();
    console.log(email.logged)
    const handleInputChange=(e)=>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
         })
     }
    
 const handleLogin=()=>{
 
  const action= {
    type: types.login,
    payload: {email: values.email, role: rolusuario.role}
  }
  dispatch(action);
   navigate(values.email=="alysmaralejandra@gmail.com" ? "/empleo" : "/todosempleos", {
    replace:true
  })


 }
      
    console.log(values)    
         
  return (
      <div>
      <Card style={{width: "500px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", marginTop: "50px"}}>
          <CardTitle tag="h4" className=" p-3 " style={{textAlign: "center"}}>
           
            Iniciar Sesión
          </CardTitle>
          <CardBody>
          <Form  onSubmit={handleLogin} method="POST">
              <FormGroup >
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  type="text"
                  required
                />
              </FormGroup>
              <FormGroup >
                <Label for="exampleEmail">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            <Button color="primary" style={{width: "100%"}}  type="submit"> Ingresar</Button>
            </Form>
            <Link to="/registro"> <div style={{marginTop: "20px"}}>Registrarse</div></Link>

          </CardBody>
        </Card>
      </div>
      
  );
};

export default Login;
