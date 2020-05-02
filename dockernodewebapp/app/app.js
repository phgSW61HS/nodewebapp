const express    =    require('express');
const app        =    express();
const router     =    express.Router();

var bodyParser = require('body-parser');
const PORT = 3000;
const HOST = '0.0.0.0';
//app.use(bodyParser.json());
//app.use(bodyParser.json()).urlencoded({extended:true}));
app.use(require("body-parser").urlencoded({extended:true}));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/',function(req,res){
      res.render('index.html');
});
app.get('/testButton',function(req,res){
      res.render('buttonres.html',{subject:req.query.subject});
});
app.post('/testCheckBoxes',function(req,res){
      console.log(req.body);
      //make sure it is an array!!!
      var foodArray = [].concat(req.body.food)
      res.render('checklist.html',{data:{name:req.body.username, food: foodArray}} );
      //res.json(req.body);
});
