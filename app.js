var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var expressLayouts = require("express-ejs-layouts")
var path = require("path");
app.use(bodyParser.urlencoded({extended:true}))

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req,res){
    res.render('landing');
})
var campgrounds=[
    {title:"Delhi",image: "https://picsum.photos/id/1019/300/300"},
    {title:"Ambala",image: "https://picsum.photos/id/1018/300/300"},
    {title:"Jammu",image: "https://picsum.photos/id/337/300/300"},
    {title: "Kasauli", image: "img.jpeg"}
]

app.get("/campgrounds",function(req,res){
    
    res.render('campgrounds',{campgrounds:campgrounds});
})

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.url;
    var newCamp={title:name, image:image};
    campgrounds.push(newCamp);
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new",function(req,res){
    res.render("newCampground")

})

app.listen(4000,function(){
    console.log("The server begins now");
});