var mongodbClient = require('mongodb').MongoClient;

var ObjectId = mongodbClient.ObjectId;
var DB_address = "mongodb://localhost:27017";

function userAdd(req, res, next) {
    mongodbClient.connect(DB_address, { useNewUrlParse: true }, function(err, con) {
        if (err) {
            res.json({ code: 0, msg: "服务器错误！" });
        } else {
            var db = con.db('lemon');
            var collection = db.collection('userlist');
            collection.insertOne({ nick_name: "荔枝糖" }, function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: "服务器错误！" });
                } else {
                  
                    res.json({ code: 1, insertedId: result.insertedId, msg: "添加成功！" });

                }
            });
        }
    })
}

function find(req, res, next) {
    mongodbClient.connect(DB_address, { useNewUrlParse: true }, function(err, con) {
        if (err) {
            res.json({ code: 0, msg: "服务器错误！" });
        } else {
            var db = con.db('lemon');
            var collection = db.collection('userlist');
            collection.find({ _id: ObjectId(id) }, function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: "服务器错误！" });
                } else {
                    // console.log(result);
                    res.json({ code: 1, insertedId: result.insertedId, msg: "添加成功！" });

                }
            });
        }
    })
}

module.exports = {
    userAdd: userAdd
};