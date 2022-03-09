const router= require("express").Router();

const Proyectospublicados = require("../models/Proyectospublicados");

//libreria de validacioes
const Joi = require("@hapi/joi");

const schemaProyecto= Joi.object({
    tema: Joi.string().min(1).max(1024).required(),
    contenido: Joi.string().min(1).max(1024).required(),
    topicos: Joi.string().min(1).max(1024).required(),
})
router.get("/", async (req, res)=>{
    try {
        const ProyectosDB = await Proyectospublicados.find()
       
        res.json({ data:ProyectosDB})
    } catch (error) {
        console.log(error)
    }
   
})
//Envio de la informacion a la base de datos
router.post("/", async(req, res)=>{
      
    //Validaciones de usuario
    const {error}= schemaProyecto.validate(req.body)
    

    if(error){
       return res.status(400).json(
            {error: error.details[0].message}
    
        )
    }
    

    const proyectospublicados = new Proyectospublicados({
        tema: req.body.tema,
        contenido: req.body.contenido,
        topicos: req.body.topicos,
       
    })
    try {
        const proyectospublicadosDB = await proyectospublicados.save()
        console.log(proyectospublicadosDB)
        res.json({
            error: null,
            data: proyectospublicadosDB,
          
        })
    
    } catch (error) {
        res.status(400).json(error)
    }
     
})
router.delete("/:id", async(req, res)=>{     
    const id=req.params.id;
   try {
        //mondodb viene con el guion bajo "_id"
      const productDB = await Proyectospublicados.findByIdAndDelete({_id: id})
      console.log(productDB)
      if(productDB){
        res.json({
            estado: true,
            mensaje: "Eliminado!"
        })
      }else{
        res.json({
            estado: false,
            mensaje: "Fallo eliminador!"
        })
      }
   
   } catch (error) {
       console.log(error);
     
   }
 })

module.exports=router;