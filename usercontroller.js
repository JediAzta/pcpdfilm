const a = require('./auth')
const mongoClient = require('mongodb').MongoClient
const mongoAuth = require('./protected/mongoauth')

const mongo_username = mongoAuth.user  
const mongo_password = mongoAuth.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.path}`  //Update the path
const DATABASE_NAME = 'filmshop' 
const USERCOLLECTION = 'users' // Update your collection name here

const userController = {     
    login(req, res) {
        const timestamp = new Date()
        const u = req.body.user
        const p = req.body.pwd       
        console.log(`${timestamp.toString()} - [${req.ip}] Someone login}`) 
        mongoClient.connect(CONNECTION_URI, (err, db)=>{
            if(err){
              console.log(err)
              res.status(500).send({"status": 500, "description": err})
            } else {
              const collection = db.db(DATABASE_NAME).collection(USERCOLLECTION)
              collection.find({uname: u, password: p}).toArray((err, result) => {
                if(err) {
                  res.status(500).send({"status":500, "description":err})
                } else {
                  if(result.length==1){                  
	  	              if(result[0].type==1){
                      a.addkey(u).then((re) => {
                        res.status(200).send({
                          "s": re,
                          "role": 1})
                      })                    
                    } else {
                      res.status(403).send({"status": 403, "description": "You have no permission for this service"})
                    }

                  } else {
                    res.status(401).send({"status": 401, "description": "Login Failed"})
                  }
                }
              })
              db.close()
            }
        })

    },
    createuser(req, res) {
      res.status(501).send({"status": 501, "description": "In progress..."})
    },
    updateuser(req, res) {
      //res.status(501).send({"status": 501, "description": "In progress..."})
      const timestamp = new Date()
      const key = req.body.key
      const newpwd = req.body.newpwd
      mongoClient.connect(CONNECTION_URI, (err, db)=>{
        if(err){
          res.status(500).send({"status":500, "description":err})
        } else {
          const collection = db.db(DATABASE_NAME).collection(USERCOLLECTION)
          collection.updateOne({"key": key}, {$set: {password: newpwd}}, (err, result) => {
              if(err) {
                res.status(401).send({"status": 401, "description": "Password update failed."})
              }                 
              console.log(`${timestamp.toString()} - password update success`)
              res.status(201).send({"status": 201, "description": "Password update successfully."})
          })
          db.close()            
        }
      })
    },
    removeuser(req, res) {
      res.status(501).send({"status": 501, "description": "In progress..."})
    }
}

module.exports = userController
