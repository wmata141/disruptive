import 'dotenv/config'
import app from "./app.js";
import connectDB from "./db.js";
import config from './config.js';

// Conectarse a la base de datos de MongoDB
connectDB();

const port = config.PORT || 8000
 
// Iniciar el servidor
app.listen(port, () => {
  console.log("Servidor iniciado en el puerto: ",port);
  console.log("process.env.PORT :",process.env.PORT);
});
