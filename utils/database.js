const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db ; 
const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(
      "mongodb://admin:admin123@localhost:27017/?authSource=admin"
    );
    console.log("✅ Connected to Local MongoDB");
    _db = client.db()
    callback();
  } catch (err) {
    console.log("❌ Mongo error:", err);
    throw new Error(err)
  }
};
const getDb = ()=>{
    if(_db){
        return _db
    }
    throw new Error("Db not found !!!")
}


exports.mongoConnect =mongoConnect;
exports.getDb = getDb;