const express = require('express');
const allRoutes = require('./src/app');
const cors = require('cors');
const { createColor, activeColors } = require('./src/controllers/controllers');
const { createSize, activeSizes } = require('./src/controllers/admin-panel/sizeControllers');
require('dotenv').config();
require('./src/db/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/fran-and-oak-admin-files', express.static('./src/uploads'));

app.use('/api', allRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});