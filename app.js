const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose"); 
 
mongoose.connect("mongodb://localhost:27017/todolistDB",{
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

const List = new mongoose.Schema({
    name :{
        type: String,
        required : true
    }
});

const todo= new mongoose.model("todo",List)


  
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
//var newitems=[];
var workitems=[];
app.use(express.static("public"));


app.get("/",function(req,res){
    var today = new Date();
    var options = {weekday:"long",month:"long",day:"numeric"};
    var datestring=today.toLocaleDateString("en-US",options);
    todo.find(function(err , getlist){
        if (err){
            console.log(err)
        }
        else{
           res.render('list.ejs',{newitems: getlist ,keyday: datestring});
        }
    })
    //res.render('list.ejs',{newitems:  ,keyday: datestring});
    
});

app.get("/:newpage",function(req,res){
    console.log(req.params.newpage);
    
});

app.post("/work",function(req,res){
    workitems.push(req.body.newwork);
    res.redirect("/work");
});

app.post("/",function(req,res){
   //newitems.push(req.body.newwork);
   var newtodo = new todo({
       name: req.body.newwork
   })
   newtodo.save();
   res.redirect("/");
    
});


app.post("/delete",function(req,res){
    var checkid = req.body.checkbox;
    todo.deleteOne({ _id : checkid }, function (err) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Data Deletion Done");
        }
    });
    res.redirect("/")
    
});


app.listen(3000,function(){
    console.log("Server is running on port 30000");
});

