const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

//Inicializations
const app = express();

//Settings
app.set('port', 3000);

//Middlewares
app.use(morgan('dev'));
// **Multer intrerpreta las img que se suban al server
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/uploads'),
  filename(req, file, cb) {
    cb(null, new Date.getTime() + path.extname(file.originalname))
  }
});
app.use(multer({storage}).single('image'));
// **interpretar datos de formularios como JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Start the server
app.listen(app.get('port'), () => {
  console.log("Server on port", app.get('port'));
});