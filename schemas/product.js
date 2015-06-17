var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
	no:{type:String},
   title:{type:String},
   imgs:[{type:String}],
   currentPrice:{type:Number},
   marketPrice:{type:Number},
   parameters:[{type:String}]
})


module.exports = ProductSchema