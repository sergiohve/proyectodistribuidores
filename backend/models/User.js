const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    nombres: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    apellidos: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    tipodegestor: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now

    }


   
})

//crear modelo
//conexion a la base de datos en coleccion "Mascota"
const User = mongoose.model("user", userSchema);

module.exports = User;