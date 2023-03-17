const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const port = process.env.PORT;
require('./src/controllers/index');
app.use(bodyParser.json());
require('./src/config/db');
const routes = require('./src/routes/index');
routes(app);



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
 
});