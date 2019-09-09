var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://gwan123:gwan123@cluster0-da878.mongodb.net/test?', { useNewUrlParser: true });

//create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'get starbucks'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
});

//AJAX POST handler
app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
});

//AJAX DELETE handler
app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
        return todo.item.replace(/ /g,'-') !== req.params.item;
    })
    res.json(data);
});

};