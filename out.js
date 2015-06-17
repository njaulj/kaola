var mongoose = require('mongoose')
var dbUrl = 'mongodb://localhost/spider1'
mongoose.connect(dbUrl)
var fs = require('fs')
//
var http = require('http')
var models_path = __dirname + '/models'
var walk = function(path) {
    fs
        .readdirSync(path)
        .forEach(function(file) {
            var newPath = path + '/' + file
            var stat = fs.statSync(newPath)

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath)
                }
            }
            else if (stat.isDirectory()) {
                walk(newPath)
            }
        })
}
walk(models_path)


var product = require('./controllers/product')

product.output()
/*

var server = http.createServer(function(req,res){
    product.output(function(err,products){
        res.writeHead(200, {
                        'Content-Type': 'ContentType'
                    });
        res.write(JSON.stringify(products))
    })
//    res.end('hell')

})

server.listen(3000)

console.log("Server runing at port: 3000");
*/