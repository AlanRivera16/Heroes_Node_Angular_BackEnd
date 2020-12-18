// CONTROLLER ///


/** IMPORTS ***/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Ataching routing to app server
const router =  require("./route/routing");


//Cors que fueron intalados previamente con npm i cores 
var corsOptions = {
    origin: "http://localhost:8080"
}


/*** Inicializacion de web server ****/
const port= process.env.PORT || 3000;  //Variable de ambiente
const app = express();

//Librerias
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true }));
app.use(cors());
app.use('/', router);

//Conexión a Mongo
const db = require("./model/heroes.model")
console.log(db.url);
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    UseUnifiedTopology: true
}).then(() => {
    console.log("Conectado a la base de datos");
}).catch(err => {
    console.log("No se pudo realizar la conexion con la base de datos");
    process.exit();
})

app.get('/', (req, res) => {
    res.json({ message: "Inicio a servidor de aplicacion" });
});



app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
});
