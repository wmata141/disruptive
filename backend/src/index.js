import 'dotenv/config'
import app from "./app.js";
import connectDB from "./db.js";
import config from './config.js';

// Connect to MongoDB database
connectDB();

const port = config.PORT || 8000
 
// Start the server
app.listen(port, () => {
  console.log("Server started on port: ",port);
  console.log("process.env.PORT :",process.env.PORT);
});
