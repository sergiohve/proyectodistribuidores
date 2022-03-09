const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const suscripcionesSchema = new Schema({
     tema: {
        type: String,
        
        min: 1,
        max: 1024
    },
    contenido: {
        type: String,
        
        min: 1,
        max: 1024
    },
    topicos: {
        type: String,
        
        min: 1,
        max: 1024
    }
})

//crear modelo
//conexion a la base de datos en coleccion "Suscripciones"
const Proyectossuscripciones = mongoose.model("Proyectossuscripciones", suscripcionesSchema);

module.exports = Proyectossuscripciones;