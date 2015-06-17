var request = require('request')
var cheerio = require('cheerio')
var mongoose = require('mongoose')
var Product = mongoose.model('Product')
var eventproxy = require('eventproxy')
var fs = require('fs')
var uploader = require('../libs/uploader')

exports.start = function(start,stop){
var count = start
var ep = new eventproxy()
ep.after('pp',stop-start,function(pp){
	console.log('OK')

})
for (var k=start;k<stop;k++){
 (function(k){ var url = 'http://www.kaola.com/product/'+k+'.html'
request(url,function(err,res,body){
	if (!err && res.statusCode == 200) {
  //  console.log(body) // Show the HTML for the Google homepage. 
    var $ = cheerio.load(body)
  //  console.log($('.product-title').text())
    if($('.product-title').text()){


      var product = {
      no:url,
	  	title:'',
	  	imgs:[],
	  	currentPrice:0,
	  	marketPrice:0,
	  	parameters:[]
	  }
    product.title = $('.product-title').text()

   // if()
   if($('.litimg_box ul li').length>0){
    for(var i = 0 ;i<$('.litimg_box ul li').length;i++){
  	//console.log(typeof($('.litimg_box ul li')))
    var iurl=$('.litimg_box ul li')[i].children[0].children[0].attribs.src
    	product.imgs.push($('.litimg_box ul li')[i].children[0].children[0].attribs.src)
    //  uploader.uploadLink($('.litimg_box ul li')[i].children[0].children[0].attribs.src.replace(/_70_70/,''),'/haitao'+iurl.substring(iurl.lastIndexOf('/')))
    }
  }
  //  console.log($('#js_currentPrice').children('span').text())
    product.currentPrice= $('#js_currentPrice').children('span').text()
  //  console.log($('#js_marketPrice').text())
    product.marketPrice =  $('#js_marketPrice').text()
  	
    if($('.goods_parameter .ellipsis').length>0){
  	for (var j = 0;j <$('.goods_parameter .ellipsis').length;j++){
  	//	console.log($('.goods_parameter .ellipsis')[j].children[0].data)
  		product.parameters.push($('.goods_parameter .ellipsis')[j].children[0].data)
  	}
  }

  	var _product = new Product(product)
  	_product.save(function(err,p){
  console.log('there is sth on %d',k)

  		ep.emit('pp',k)
      count++
  //  console.log(count)
  	})
    
  }else{
    console.log('there is nothing on %d',k)
  		ep.emit('pp',k)
    count++
   //     console.log(count)

  }
}

})
})(k)
}
}



exports.output = function(req,res){
  Product.find()
  .exec(function(err,products){
    res.render('index',{
      products:products
    })
  })
}