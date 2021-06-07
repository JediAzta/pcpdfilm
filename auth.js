const mongoClient = require('mongodb').MongoClient
const mongoAuth = require('./protected/mongoauth')

const mongo_username = mongoAuth.user  
const mongo_password = mongoAuth.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.path}`  //Update the path
const DATABASE_NAME = 'filmshop'
const UCOLLECTION = 'users'

const a = {
    checkAuth(key) {
      return new Promise((resolve, reject) => {
        mongoClient.connect(CONNECTION_URI, (err, db)=>{
          const collection = db.db(DATABASE_NAME).collection(UCOLLECTION)
          collection.find({"key": key}).toArray((err, result) => {
            if(err)
              reject()
            if(result.length==1) {
              resolve()
            } else {
              reject()
            }
          })
          db.close()
        })
  
      })
    },
    addkey(user) {
      return new Promoise((resolve, reject) => {
        const timestamp = new Date()
        const key2create = timestamp.getTime().toString(36) + Math.random().toString(36).slice(2)

        mongoClient.connect(CONNECTION_URI, (err, db)=>{
          if(err){
            reject(err)
          } else {
            const collection = db.db(DATABASE_NAME).collection(UCOLLECTION)
            collection.updateOne({"uname": user}, {$set: {key: key2create}}, (err, result) => {
                if(err) {
                  reject(err)
                }                 
                console.log(`${timestamp.toString()} - ${user} login success`)
                resolve(key2create)
            })
            db.close()            
          }
        })
      })
    },
    removekey(user) {
      const timestamp = new Date()      
      mongoClient.connect(CONNECTION_URI, (err, db)=>{
        if(err){
          return ""
        } else {
          const collection = db.db(DATABASE_NAME).collection(UCOLLECTION)
          collection.updateOne({"uname": user}, {$set: {key: ""}}, (err, result) => {
            if(err) {
              res.status(500).send({"status":500, "description":err})
            } else {                
              console.log(`${timestamp.toString()} - ${user} logout success`)              
            }
          })
          db.close()
          return key2create
        }
    })
  }
}

module.exports = a
