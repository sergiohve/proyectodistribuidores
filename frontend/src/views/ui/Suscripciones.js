import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "../../hooks/useForm"
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
  CardText,
 
} from "reactstrap";

const baseUrl= "http://localhost:3002/api/suscripciones"



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
const Suscripciones = () => {
  const [suscrito, setSuscrito] = useState(false);
  const  [values, handleInputChange, reset, setValues] = useForm([]);
  const [valueStoragetema, setValueStoragetema]=useState(
    window.localStorage.getItem("tema")
    
   );
  const [valueStoragecontenido, setValueStoragecontenido]=useState(
    window.localStorage.getItem("contenido")
    
   );
   const [valueStoragetopicos, setValueStoragetopicos]=useState(
    window.localStorage.getItem("topicos")
    
   );


 const setLocalStorageRemove=()=>{
  setSuscrito(!suscrito)
   try {
    setValueStoragetema("")
    setValueStoragecontenido("")
    setValueStoragetopicos("")
    localStorage.removeItem("tema")
    localStorage.removeItem("contenido")
    localStorage.removeItem("topicos")
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


   
    const suscribirse=()=>{
      setSuscrito(!suscrito)
    }

    console.log(values)

    
  return (
    <div>
    
      <Card>
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
         Mis suscripciones
        </CardTitle>
      </Card>
      <Row style={{height: "500px"}}>
       {valueStoragecontenido ?
          <Col md="6" lg="6" >
         <Card body style={{minHeight: "315px"}}>
         <CardTitle tag="h3">{valueStoragetema}</CardTitle>
         <CardText>
         {valueStoragecontenido}
         </CardText>
         <CardText>
         {valueStoragetopicos}
         </CardText>
         <CardText style={{display: "flex"}}>
         <div> Publicado por</div> <div style={{color: "black", marginLeft: "10px"}}>Alysmar Alejandra</div>
         </CardText>
        
         <div>
           <Button color="warning"  onClick={setLocalStorageRemove}>Eliminar</Button>
          
         </div>
       </Card>
       </Col>
       : <CardTitle tag="h3" className="border-bottom p-3 mb-0" style={{textAlign: "center"}}>
       
     ¡No hay suscripciones!
     </CardTitle>
      }
      
     
      </Row>
        

    </div>
  );
};

export default Suscripciones;
