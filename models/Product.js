const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name : {type:String, required : true, unique : true},
        description : {type:String, required : true},
        image : {type:String, required : true},
        category : {type:Array},
        size : {type:String, required : true},
        color : {type:String, required : true},
        price : {type:Number, required : true},
        inStock : {type:Number, required : true},
        ratings : {type:Number, required :true},
        reviews : {type:String, required : true},
       
    },
    //current time and date
    {timestamps:true}
)
module.exports=mongoose.model("Product",ProductSchema)