// Requires \\
var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/world')

var conn = mongoose.connection

var Countries = mongoose.model('countries', {
    name       : {type: String},
    frenchName : {type: String},
    localName  : {type: String},
    region     : {type: String},
    been       : {type: Boolean}
})

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
app.get('/', function(req, res){
  res.sendFile('/index.html', {root: './public/html/'})
});

app.get('/loadcountries', function(req, res){
    Countries.find({}, function(error, data) {
        if (error) {console.log(error)}
        else {
//            console.log(data)
            res.send(data)
        }
    })
})

app.post('/searchforcountry', function(req, res){
    Countries.find({name: req.body.country}, function(error, data) {
        if (error) {console.log(error)}
        else {
            console.log(data)
            res.send(data)
        }
    })
})

app.post('/beentherecheck', function(req, res) {
    Countries.update({name: req.body.name}, {$set: {been: true}}, function(error, data) {
        if (error) {console.log(error)}
        else {
            console.log(data)
            res.send(data)
        }
    })
})


// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})




// var countryArray = []
//var sort = function(list) {
//	var country = ''
//	for (var i = 0; i < list.length; i++) {
//		country = new Country(list[i].name, list[i].frenchName, list[i].localName, list[i].region)
//        conn.collection('countries').insert(country)
//		// console.log(list[i].name, list[i].frenchName)
//	}
//}
//
//sort(countries)














