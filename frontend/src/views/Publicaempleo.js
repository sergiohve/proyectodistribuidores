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
 
} from "reactstrap";
import { useForm } from "../hooks/useForm";
import axios from 'axios';
import { Navigate  } from "react-router-dom";
import { useEffect } from "react";

const baseUrl= "http://localhost:3002/api/proyectospublicados/"

async function postProyectos (){
  try {
    const response = await axios({
     url: `${baseUrl}`,
     method: "POST"
    })
    return <Navigate  to='/#/alerts'  />
  } catch (error) {
    console.log(error)
  }
}

const Starter = () => {
          const  [values, handleInputChange, reset, setValues] = useForm();
          console.log(values)
          
          
          useEffect(()=>{
     
            async function loadProyectos(){
              const response= await postProyectos()
              
              setValues(values)
              return response
              
            }
           
          
            loadProyectos()
            return <Navigate  to='/#/alerts'  />
            }, [])
       
         
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell"> </i>
            Publica un proyec
          </CardTitle>
          <CardBody>
          <Form  action={baseUrl} method="POST">
              <FormGroup >
                <Label for="tema">Tema del proyecto</Label>
                <Input
                  id="tema"
                  name="tema"
                  type="text"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup >
                <Label for="contenido">Contenido</Label>
                <Input
                  id="contenido"
                  name="contenido"
                  type="text"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup >
                <Label for="topicos">Topicos</Label>
                <Input
                  id="topicos"
                  name="topicos"
                  type="text"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
          
              <Button type="submit" color="primary">Publicar</Button>
            </Form>
           
             
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Starter;
