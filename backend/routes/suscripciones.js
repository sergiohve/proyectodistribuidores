const router= require("express").Router();

const Proyectossuscripciones = require("../models/Suscripciones");

//libreria de validacioes
const Joi = require("@hapi/joi");

const schemaSuscriciones= Joi.object({
    tema: Joi.string().min(1).max(1024).required(),
    contenido: Joi.string().min(1).max(1024).required(),
    topicos: Joi.string().min(1).max(1024).required(),
})
router.get("/", async (req, res)=>{
    try {
        const ProyectosDB = await Proyectossuscripciones.find()
       
        res.json({ data:ProyectosDB})
    } catch (error) {
        console.log(error)
    }
   
})
//Envio de la informacion a la base de datos
router.post("/", async(req, res)=>{
      
    //Validaciones de usuario
    const {error}= schemaSuscriciones.validate(req.body)
    

    if(error){
       return res.status(400).json(
            {error: error.details[0].message}
    
        )
    }
    

    const proyectosuscripciones = new Proyectossuscripciones({
        tema: req.body.tema,
        contenido: req.body.contenido,
        topicos: req.body.topicos,
       
    })
    try {
        const proyectossuscripcionesDB = await proyectosuscripciones.save()
        console.log(proyectossuscripcionesDB)
        res.json({
            error: null,
            data: proyectossuscripcionesDB,
          
        })
    
    } catch (error) {
        res.status(400).json(error)
    }
     
})

module.exports=router;