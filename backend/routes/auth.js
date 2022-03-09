const router= require("express").Router();

const User = require("../models/User");

//Json web token 
const jwt= require("jsonwebtoken");

//Libreria de encriptacion
const bcrypt = require("bcrypt");


//libreria de validacioes
const Joi = require("@hapi/joi");

const schemaRegister= Joi.object({
    nombres: Joi.string().min(6).max(255).required(),
    apellidos: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    tipodegestor: Joi.string().min(6).max(255).required(),
})
const schemaLogin= Joi.object({  
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),

})



router.post("/login", async(req, res)=>{
    const {error}= schemaLogin.validate(req.body)

    if(error){
        return res.status(400).json(
             {error: error.details[0].message}
     
         )
     }

     const user=  await User.findOne({email:  req.body.email})
     if(!user) return res.status(400).json({error: true,message: "Email no Registrado"})
    //AQui vamos a comparar lo que mandamos(req.body.password) podemos compararlo con el user.password
     const passValida = await bcrypt.compare(req.body.password, user.password)
     if(!passValida) return res.status(400).json({error:true, mensaje: "Contraseña Invalida"})

      const token = jwt.sign({
          name: user.name,
          id: user._id 
      }, process.env.TOKEN_SECRET)

     res.header("auth-token", token).json({
        error: null,
        data: {token},
     })

    
})



//Envio de la informacion a la base de datos
router.post("/register", async(req, res)=>{
      
    //Validaciones de usuario
    const {error}= schemaRegister.validate(req.body)
    

    if(error){
       return res.status(400).json(
            {error: error.details[0].message}
    
        )
    }
    
    const existeElEmail =  await User.findOne({email:  req.body.email})
    if(existeElEmail) return res.status(400).json({error: true,message: "Email ya registrado"})

    const saltos= await bcrypt.genSalt(10);
    const passwordEncrip = await bcrypt.hash(req.body.password, saltos)

    const user = new User({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: passwordEncrip,
    tipodegestor: req.body.tipodegestor,

    })
    try {
        const userDB = await user.save()
        res.json({
            error: null,
            data: userDB,
          
        })

    } catch (error) {
        res.status(400).json(error)
    }
     
})

module.exports=router;