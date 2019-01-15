var mongodb = require('mongodb');
var mongodbClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;

var DB_address = "mongodb://localhost:27017";

function classifyGet(req, res, next) {
    mongodbClient.connect(DB_address, { useNewUrlParse: true }, function(err, con) {
        if (err) {
            res.json({ code: 0, msg: "服务器错误！" });
        } else {
            var db = con.db('lemon');
            var collection = db.collection('classify');
            collection.find().toArray(function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: "服务器错误！" });
                } else {

                    res.json({ code: 1, msg: result });

                }
            });
        }
    })
}

function classifyAdd(req, res, next) {
    var uid = req.body.uid;
    var iconclass = req.body.iconclass;
    mongodbClient.connect(DB_address, { useNewUrlParse: true }, function(err, con) {
        if (err) {
            res.json({ code: 0, msg: "服务器错误！" });
        } else {
            var db = con.db('lemon');
            var collection = db.collection('iconlist');
            collection.insertOne({ uid: uid, iconclass: iconclass }, function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: "服务器错误！" });
                } else {
                    console.log(result);
                    res.json({ code: 1, insertedId: result.insertedId, msg: "类添加成功！" });

                }
            });
        }
    })
}
module.exports = {
    classifyAdd: classifyAdd,
    classifyGet: classifyGet

};