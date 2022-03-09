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
import { Navigate  } from "react-router-dom";
import { useEffect } from "react";

const baseUrl= "http://localhost:3002/api/user/register"

async function postPersonas (){
  try {
    const response = await axios({
     url: `${baseUrl}`,
     method: "POST"
    })
    return <Navigate  to='/'  />
  } catch (error) {
    console.log(error)
  }
}
  
  const Registro = () => {
    const  [values, handleInputChange, reset, setValues] = useForm();
    console.log(values)
    
    
    useEffect(()=>{

      async function loadProducts(){
        const response= await postPersonas()
        
        setValues(values)
        return response
        
      }
     
    
      loadProducts()
      return <Navigate  to='/'  />
      }, [])
           
    return (
        <div>
        <Card style={{width: "500px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", marginTop: "50px"}}>
            <CardTitle tag="h4" className=" p-3 " style={{textAlign: "center"}}>
             
              Registrarse
            </CardTitle>
            <CardBody>
            <Form action={baseUrl} method="POST">
                <FormGroup >
                  <Label for="nombres">Nombres</Label>
                  <Input
                    id="nombres"
                    name="nombres"
                    type="text"
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup >
                  <Label for="apellidos">Apellidos</Label>
                  <Input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup >
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup >
                  <Label for="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    required

                  />
                </FormGroup>
                <FormGroup>
                <Label for="tipodegestor">Tipo de gestor</Label>
                <Input id="tipodegestor" name="tipodegestor"  onChange={handleInputChange} type="select">
                  <option></option>
                  <option value="empleador">Empleador</option>
                  <option value="empleado">Empleado</option>

                </Input>
              </FormGroup>
               <Button type="submit" color="primary" style={{width: "100%"}}>Registrar</Button>
              </Form>
              <div style={{marginTop: "20px"}}><Link to="/login">Iniciar sesión</Link></div>
  
            </CardBody>
          </Card>
        </div>
        
    );
  };
  
  export default Registro;
  