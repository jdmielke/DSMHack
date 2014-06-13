var mongo = require('mongodb');
mongoose = require('mongoose');
 
mongoose.connect("mongodb://localhost/chrysalis");
var db = mongoose.connection;
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to database");
        db.collection('images', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The collection doesn't exist.");
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving image: ' + id);
    db.collection('images', function(err, collection) {
        collection.find('_id':new BSON.ObjectID(id)).toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('images', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};