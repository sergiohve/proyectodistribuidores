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
} from "reactstrap";
import axios from "axios";
import { useForm } from "../../hooks/useForm";


const baseUrl= "http://localhost:3002/api/proyectospublicados"



/*async function DeleteProyectos (){
  try {
    const response = await axios({
     url: `${baseUrl}/:id`,
     method: "DELETE"
    })
    return response
  } catch (error) {
    console.log(error)
  }
}*/
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
const Empleospublicados = () => {
  const [suscrito, setSuscrito] = useState(false);
  const  [values, handleInputChange, reset, setValues] = useForm([]);
 
  
  useEffect(()=>{
     
    async function loadProducts(){
      const response= await getProductos()
     
      setValues(response.data.data)
      return response
    }
    loadProducts()
    }, [])

    /*useEffect(()=>{
     
      async function loadProyectos(){
        const response= await DeleteProyectos()
       
        setValues(response.data.data)
        return response
      }
     
    
      loadProyectos()
      }, [])*/
   
    const suscribirse=()=>{
      setSuscrito(!suscrito)
    }

    const handledelete = (id)=>{
      console.log(id)
      setValues(...values)
      async function DeleteProyectos (){
       
        try {
          const response = await axios({
           url: `http://localhost:3002/api/proyectospublicados/${id}`,
           method: "DELETE"
          })
          
          console.log(response)
          return response
        } catch (error) {
          console.log(error)
        }
    }
    DeleteProyectos();
  }


    console.log(values)
  return (
    <div>
    
      <Card>
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
         Mis publicaciones
        </CardTitle>
      </Card>
      <Row style={{height: "500px"}}>
         {values.length>0 ? values.map((item, index) => (
          <Col md="6" lg="6" key={item._id}>
         <Card body style={{minHeight: "315px"}}>
         <CardTitle tag="h3">{item.tema}</CardTitle>
         <CardText>
         {item.contenido}
         </CardText>
         <CardText>
         {item.topicos}
         </CardText>
         <CardText>
         {item.nombreempleador}
         </CardText>
         <div>
           <Button color="danger" id={item._id} name={item._id} value={item._id} onClick={()=>handledelete(item._id)}>Eliminar</Button>
          
         </div>
       </Card>
       </Col>
      
     )) :
     <CardTitle tag="h4" className="border-bottom p-3 mb-0" style={{textAlign: "center"}}>
        
         ¡No has publicado!
        </CardTitle>

        
       } 
      </Row>
        

    </div>
  );
};

export default Empleospublicados;
