const express = require('express');
const allRouters = require('./src/allconnectivityjunction');
const cors = require('cors');

// import .env file
    require('dotenv').config();

// import Database config file or Database connecting file
    require('./src/db/config');

    const server = express();
    server.use(express.json());

//cors - cross origin 
    server.use(cors());

    server.use('/fran-and-oak-admin-files', express.static('./src/uploadfiles'));
    server.use('/frank-and-oak-files', express.static('./src/uploadfiles'));
    server.use('/fran-and-oak', express.static('./src/uploadfiles'));
    server.use('/fran-and-oak-order', express.static('./src/uploadfiles'));

//Router link
    server.use('/allApi', allRouters)

// port is decleare in .env file
    server.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })