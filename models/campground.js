var mongoose=require("mongoose");


var campgroundSchema=mongoose.Schema({
    title: String,
    image: String,
    description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ] 
});
module.exports=mongoose.model("camp",campgroundSchema);
