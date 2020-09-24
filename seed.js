var mongoose=require("mongoose");
var camp=require("./models/campground");
var comment=require("./models/comments");

var data=[{
    title: "1st Blog",
    image: "https://picsum.photos/id/1015/300/300",
    description: "This is my 1st Blog"
},
{
    title: "2nd Blog",
    image: "https://picsum.photos/id/1015/300/300",
    description: "This is my 2nd Blog"
},{
    title: "3rd Blog",
    image: "https://picsum.photos/id/1015/300/300",
    description: "This is my 3rd Blog"
}]

function seedDB(){
    camp.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log('successfull removed');
            data.forEach(function(seed){
                camp.create(seed,function(err,x){
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Data added");
                        comment.create({
                            text: "This is my very 1st comment",
                            author: " Kritik Ajmani"
                        },function(err,cmmnt){
                            if(err){
                                console.log(err)
                            }else{
                                x.comments.push(cmmnt);
                                x.save();
                                console.log("Comment is successfully added");
                            }
 // post.create({
//     title:" Goblet",
//     description:"Fire"
// },function(err,article){
//     user.findOne({name:"Sirius Black"},function(err,found){
//         found.posts.push(article);
//         found.save(function(err,save){});
//     })
// })
                        })
                    }
                })
            
            })
        }
    })
   
    
}


module.exports=seedDB;