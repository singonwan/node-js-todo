var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://gwan123:gwan123@cluster0-da878.mongodb.net/test?', { useNewUrlParser: true });

//create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// test for adding to database
// var itemOne = Todo({item: 'get starbucks'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
// });

// dummy data - var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
    //get data from mongodb and pass it to the view
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo', {todos: data});
    });   
});

//AJAX POST handler
app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add it to MongoDB
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

//AJAX DELETE handler
app.delete('/todo/:item', function(req, res){
    //delete the requested item from MongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

};