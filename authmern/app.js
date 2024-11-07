require("dotenv").config();
require('express-async-errors');


const connectDB = require("./db/connect");
const express = require("express");

const app = express();
const mainRouter = require("./routes/user");
const scanRoute = require("./routes/scanRoute")
const drugsRoute = require("./routes/Drugs")
const manufacturerRoute = require("./routes/manufacturerRoute")

app.use(express.json());
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',  // Allow requests from your frontend's port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
  credentials: true,  // Allow cookies if you're using them (optional)
};

// Use the configured CORS options
app.use(cors(corsOptions));

app.use("/api/v1", mainRouter);
app.use('/api/v1/qr', scanRoute);
app.use('/api/v1', require('./routes/auth'));
app.use('/api/v1/drugs', drugsRoute);
app.use('/api/v1/manufacturer', manufacturerRoute);

const port = process.env.PORT || 5000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

