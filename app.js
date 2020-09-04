var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var expressLayouts = require("express-ejs-layouts")
var path = require("path");
app.use(bodyParser.urlencoded({extended:true}))
var mongoose= require("mongoose");
const { strict } = require('assert');
const { stringify } = require('querystring');
mongoose.connect("mongodb://localhost/campgrounds",{useNewUrlParser: true});

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

//database
var campgroundSchema=mongoose.Schema({
    title: String,
    image: String
});

var camp=mongoose.model("camp",campgroundSchema);
// camp.create({
//     title:"Ambala",
//     image: "https://picsum.photos/id/1018/300/300"
// },function(err,camp){
//     if(err){
//         console.log("Error");
//     }else{
//         console.log("Successfully added to the database");
//     }
// })
app.get("/", function(req,res){
    res.render('landing');
})

app.get("/campgrounds",function(req,res){
   camp.find({},function(err,x){
       if(err){
           console.log("Error occured");
       }else{
           res.render("campgrounds",{campgrounds:x})
       }
   })
})

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.url;
    var newCamp={title:name, image:image};
    camp.create(newCamp,function(){
        res.redirect("/campgrounds")
    })
    
})

app.get("/campgrounds/new",function(req,res){
    res.render("newCampground")
})

app.listen(4000,function(){
    console.log("The server begins now");
});