const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

app.engine('mustache', mustache());

app.set('views', './views');
app.set('view engine', 'mustache');

var todos = [];
// var todos = [{task: 'test todo', checked: false}, {task: 'test todo completed', checked: true}];
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.get('/', (request, response)=>{
  response.render('index', {todos:todos});
});

app.post('/', (request, response) => {
    
  var task = request.body.task;
  request.checkBody('task', ' add your do here').notEmpty();
  var errors = request.validationErrors();

    if(errors){
      response.render('index',{todos, errors});
    }
    
    else {
      var newTodo = {};
          
      newTodo.task = task;
      newTodo.checked = false;
        
      todos.push(newTodo);
      response.render('index',{todos:todos});
    }   
});

 app.post('/:taskName', (request, response)=> {
   
   var taskToComplete = request.params.taskName;
   
    for (var i = 0; i<todos.length; i++) {
      
      if(taskToComplete == todos[i].task) {
          
          todos[i].checked = true;
      }
   }
   console.log(todos);
      response.render('index',{todos:todos});

 })


app.listen(3000);