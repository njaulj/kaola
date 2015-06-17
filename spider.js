var mongoose = require('mongoose')
var dbUrl = 'mongodb://localhost/spider4'
mongoose.connect(dbUrl)
var fs = require('fs')
//

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
product.start(8500,9000)
