const express=require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const cors= require("cors");
const PdfPrinter = require("pdfmake");
const fs= require("fs");
require("dotenv").config()

const app=express();

const fonts= require("./fonts");
const styles= require("./styles");
const {content}= require("./pdfContent");

let docDefinition= {
  content: content,
  styles: styles
};

const printer = new PdfPrinter(fonts);

let pdfDoc= printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("pdfs/pdfTest.pdf"));
pdfDoc.end();

app.use(cors({
  origin: "*"
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//conexion BD
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ftytl.mongodb.net/${process.env.BDNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a MONGODB')) 
  .catch(e => console.log('error de conexión', e))


//middlewars
app.use(express.static(__dirname + "/public"))

//importo las rutas
const authRoutes=require("./routes/auth");
const validaToken= require("./middlewars/validate-token");
const admin= require("./routes/admin");
const suscripciones=require("./routes/suscripciones");
const proyectos= require("./routes/proyectospublicados");


//rutas web
app.use("/api/user", authRoutes);
app.use("/api/suscripciones", suscripciones);
app.use("/api/proyectospublicados", proyectos);
app.use("/api/admin", validaToken, admin);

//inicar server
const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=>{
    console.log(`Servidor andando en: ${PORT}`)
})


