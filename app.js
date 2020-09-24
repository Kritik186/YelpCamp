var express=require('express');
var bodyParser=require('body-parser')
var expressLayouts = require("express-ejs-layouts")
var path = require("path");
var mongoose= require("mongoose");
const { strict } = require('assert');
const { stringify } = require('querystring');
var camp=require("./models/campground");
var comment=require("./models/comments");
var seedDB=require("./seed");
const campground = require('./models/campground');

// App config
seedDB()
var app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressLayouts);
mongoose.connect("mongodb://localhost/campgrounds",{useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function(req,res){
    res.render('landing');
})

app.get("/campgrounds",function(req,res){
   camp.find({},function(err,x){
       if(err){
           console.log("Error occured");
       }else{
           res.render("campground/campgrounds",{campgrounds:x})
       }
   })
})

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.url;
    var description=req.body.ds;
    var newCamp={title:name, image:image, description:description};
    camp.create(newCamp,function(){
        res.redirect("/campgrounds")
    })
})

app.get("/campgrounds/new",function(req,res){
    res.render("campground/newCampground")
})

app.get("/campgrounds/:id",function(req,res){
    camp.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){
            console.log(err);
        }else{
            console.log(found);
            res.render("campground/show",{found:found})
        }
    })
})

//Comments routes
app.get("/campgrounds/:id/comments/new",function(req,res){
    campground.findById(req.params.id,function(err,found){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new",{found:found});
        }
    })
})

app.post("/campgrounds/:id/comments",function(req,res){
    campground.findById(req.params.id,function(err,found){
        if(err){
            console.log(err)
        }else{
            comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    found.comments.push(comment);
                    found.save();
                    res.redirect("/campgrounds/"+found._id);    
                }
            })
        }   
    })
})
app.listen(3000,function(){
    console.log("The server begins now");
});