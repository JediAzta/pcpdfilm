const mongoClient = require("mongodb").MongoClient
const mongoAuth = require('../protected/mongoauth')

const mongo_username = mongoAuth.user
const mongo_password = mongoAuth.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.path}`
const DATABASE_NAME = mongoAuth.dbname

exports.run_query = async (collection, query) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query).toArray()
  return result
}

exports.run_insert = async (collection, document) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
  if (result.acknowledged) {
    return { "status": 201, "description": "Data insert successfully", "id": result.insertedId }
  } else {
    return {"status": 500, "description": "Data insert failed"}
  }
}

exports.run_update = async (collection, query, document) => {
  const updateDoc = {$set: document}  
  try{
    const dbClient = await mongoClient.connect(CONNECTION_URI)      
    const result = await dbClient.db(DATABASE_NAME).collection(collection).updateOne(query, updateDoc)  
    if (result.modifiedCount == 1) {
      return { "status": 201, "description": "Data update successfully"}
    } else {
      return {"status": 500, "description": "Data update failed"}
    }
  }catch(err){
    return {"status": 500, "description": `Data update failed - ${err}`}
  }    
}
