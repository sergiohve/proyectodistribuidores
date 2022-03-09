import React, { useEffect, useState } from "react";
import {
  Alert,
  UncontrolledAlert,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  Form,
} from "reactstrap";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { Navigate  } from "react-router-dom";
import {
  FormGroup,
  Label,
  Input,
 
} from "reactstrap";


const baseUrl= "http://localhost:3002/api/proyectospublicados"
const baseUrlSuscripciones= "http://localhost:3002/api/suscripciones"


async function postProyectos (){
  try {
    const response = await axios({
     url: `${baseUrlSuscripciones}`,
     method: "POST"
    })
    return <Navigate  to='/#/alerts'  />
  } catch (error) {
    console.log(error)
  }
}



async function getProductos (){
  try {
    const response = await axios({
     url: `${baseUrl}`,
     method: "GET"
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
const Todosempleos = () => {
  const [suscrito, setSuscrito] = useState(false);
  const  [values, handleInputChange, reset, setValues] = useForm([]);
  const [valueStorage, setValueStorage]=useState(
   window.localStorage.getItem("tema")
   
  );
 
  
   
 
 
 
 

  const setLocalStorage=(valueStorageparam)=>{
    setSuscrito(!suscrito)
     try {
      setValueStorage(values)
      window.localStorage.setItem("tema", values[0].tema)
      window.localStorage.setItem("contenido", values[0].contenido)
      window.localStorage.setItem("topicos", values[0].topicos)
     } catch (error) {
       console.error(error)
     }
  }
 
 
 
 
  useEffect(()=>{
     
    async function loadProducts(){
      const response= await getProductos()
     
      setValues(response.data.data)
      return response
    }
   
    loadProducts()
    }, [])
      
   
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
    <div>
    
      <Card>
     
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
         Empleos publicados por la comunidad
        </CardTitle>
      </Card>
      <Row style={{height: "500px"}}>
     
      
         {values.length>0 ? values.map((item, index) => (

          <Col md="6" lg="6" key={item._id}>
            <Form onSubmit={setLocalStorage}>
              <div style={{display: "none"}}>
              <FormGroup >
                <Label for="tema">Tema del proyecto</Label>
                <Input
                  id="tema"
                  name="tema"
                  type="text"
                  onChange={e=>setLocalStorage(item.tema)}
                  value={item.tema}
                  required
                />
              </FormGroup>
              <FormGroup >
                <Label for="contenido">Contenido</Label>
                <Input
                  id="contenido"
                  name="contenido"
                  type="text"
                  value={item.contenido}
                  onChange={e=>setLocalStorage(item.contenido)}
                  required
                />
              </FormGroup>
              <FormGroup >
                <Label for="topicos">Topicos</Label>
                <Input
                  id="topicos"
                  name="topicos"
                  type="text"
                  value={item.topicos}
                  onChange={e=>setLocalStorage(item.topicos)}
                  required
                />
              </FormGroup>
              </div> 
          
             
           
            
         <Card body style={{minHeight: "315px"}}>
        
         <CardTitle tag="h3" value="temaa"  id="tema" name="tema" onChange={handleInputChange}>{item.tema}</CardTitle>
         <CardText  name="contenido" onChange={handleInputChange}>
         {item.contenido}
         </CardText>
         <CardText name="topicos" onChange={handleInputChange}>
         {item.topicos}
         </CardText>
         <CardText style={{display: "flex"}}>
         <div> Publicado por</div> <div style={{color: "black", marginLeft: "10px"}}>{item.nombreempleador}</div>
         </CardText>
         <div>
           <Button type="submit" color={!suscrito ?  "primary" : "info"}>{!suscrito  ? "Suscribirse" : "Suscrito"}</Button>
         </div>
         
       </Card>
       </Form>
       <div  style={{marginBottom: "auto", top: 88, position: "fixed", marginLeft: "auto", right: 0}}>
      {suscrito ? <div style={{marginLeft: "auto", right: 0}}><Alert color="primary">Te has suscrito a este empleo</Alert></div> : ""}
      </div>
     
       </Col>
       
      
     )) :
     <CardTitle tag="h4" className="border-bottom p-3 mb-0" style={{textAlign: "center"}}>
        
         ¡No hay registros de suscripciones!
        </CardTitle>
       } 
     

       
 
      </Row>
    

    </div>
  );
};

export default Todosempleos;
