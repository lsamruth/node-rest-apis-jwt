const MongoClient = require('mongodb').MongoClient;

let url = "mongodb://localhost:27017/myResto";

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
        console.log("connected");
        _db = client.db();
        callback();
    })
    .catch(err => {throw err})
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw "No Database Found";
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
// module.exports = {
//     mongoConnect : mongoConnect,
//     getDb : getDb
// }

/**
 * 
 * const MongoConnect = (callback) =>{
    MongoClient.connect(url,{ useNewUrlParser: true },(err, conn) => {
        if (err) throw err;

        // console.log('connected to db successfully');
        // let db = conn.db("my-resto");


        // db.createCollection("amruth", (err, res)=>{
        //     if(err) throw err;

        //     console.log(res);
        // })
    }).then(client=>{
        callback(client);
        console.log("connected");
    })
    .catch(err=>console.log(err))
}
 * */