var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();

//set up template engine - ejs
app.set('view engine', 'ejs');

//setting up static files 
app.use(express.static('./public')); //not route specific so it will be use everytime

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('listening to port 3000');
