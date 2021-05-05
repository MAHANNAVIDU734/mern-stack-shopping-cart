require('dotenv').config();
const express = require("express");
const server = express();

//mongoose
const mongoose = require("mongoose");

//database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    })
    //parser
const bodyParser = require("body-parser");
//cors
const cors = require("cors");


//body parser for the params
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//user CORS
server.use(cors());



const user = require('./routes/user');
//routes
const product = require("./routes/product");


server.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");


    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");

        return res.status(200).json({
            "statusMessage": "ok"
        });
    }

    next();
});

server.use("/", product);

server.use((req, res, next) => {
    const error = new Error("Unable to manage the request");

    error.status = 404;

    next(error);
})


server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        "error": {
            "message": error.message
        }
    })
});






const port = process.env.PORT || 4000;



server.listen(port, () => {
    console.log('Server is running @ localhost:4000');
});