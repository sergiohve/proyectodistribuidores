const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const proyectoSchema = new Schema({
     tema: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    contenido: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    topicos: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    view: {
        type: boolean,
        default: false
    },
    nombreempleador: {
        type: String,
        default: "Alysmar Zuñiga"

    }
   
   
})

//crear modelo
//conexion a la base de datos en coleccion "Mascota"
const Proyectospublicados = mongoose.model("Proyectospublicados", proyectoSchema);

module.exports = Proyectospublicados;