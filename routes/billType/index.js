var mongodb = require('mongodb');
var mongodbClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;

var DB_address = "mongodb://localhost:27017";

function billAdd(req, res, next) {
    var uid = req.body.uid;
    var cid = req.body.cid;
    var type = req.body.type;
    var timer = req.body.timer;
    var money = req.body.money;
    var title = req.body.title;

    mongodbClient.connect(DB_address, { useNewUrlParse: true }, function(err, con) {
        if (err) {
            res.json({ code: 0, msg: "服务器错误！" });
        } else {
            var db = con.db('lemon');
            var collection = db.collection('bill_list');

            collection.insertOne({ uid: uid, cid: cid, type: type, timer: timer, money: money, title: title }, function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: "服务器错误！" });
                } else {
                    console.log(result);
                    res.json({ code: 1, insertedId: result.insertedId, msg: "添加成功！" });

                }
            });
        }
    })
}

function billDelete(req, res, next) {
    var billId = req.body.id;
    mongodbClient.connect(DB_address, { useNewUrlParse: true }, function(err, con) {
        if (err) {
            res.json({ code: 0, msg: "服务器错误！" });
        } else {
            var db = con.db('lemon');
            var collection = db.collection('bill_list');
            collection.deleteOne({ _id: ObjectId(billId) }, function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: "服务器错误！" });
                } else {

                    res.json({ code: 1, msg: "删除成功！" });

                }
            });
        }
    })
}

function billGet(req, res, next) {
    var billId = req.body.uid;
    var year = req.body.year;
    var month = req.body.month;
    mongodbClient.connect(DB_address, { useNewUrlParser: true }, function(err, con) {
        if (err) {
            res.json({ code: 0, msg: "服务器错误！" });
        } else {
            var db = con.db('lemon');
            var collection = db.collection('bill_list');
            var obj = null;
            if (year && month) {
                var reg = new RegExp("^" + year + month);
                obj = { uid: billId, timer: { $regex: reg } };
            } else if (year) {
                var reg = new RegExp("^" + year);
                obj = { uid: billId, timer: { $regex: reg } };
            } else {
                obj = { uid: billId };
            }
            console.log(obj);
            collection.find(obj).toArray(function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: "服务器错误！" });
                } else {

                    res.json({ code: 1, msg: result });

                }
            });
        }
    })
}



module.exports = {
    billAdd: billAdd,
    billDelete: billDelete,
    billGet: billGet

};