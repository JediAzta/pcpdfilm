const user = require('./auth')
const request = require('request')
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const { checkAuth } = require('./auth')
const mongoAuth = require('./protected/mongoauth')

const mongo_username = mongoAuth.user  
const mongo_password = mongoAuth.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.path}`  //Update the path
const DATABASE_NAME = 'filmshop' 
const FILMSCOLLECTION = 'films' 


const filmController = {
  qfilm(req, res) {
    const url = 'http://www.omdbapi.com/'
    const APIkey = "54441395"
    const title = req.params.title
    const timestamp = new Date()
    console.log(`${timestamp.toString()} - [${req.ip}] Retrieve data from OMDb for ${title}`)
    request.get(`${url}?apikey=${APIkey}&t=${title}`, (err, r, body) => {
      if(err) {
        throw(err)
      }
      const j = JSON.parse(body)
      res.status(200).send({
        "title": j.Title,
        "year": j.Year,
        "released": j.Released,
        "runtime": j.Runtime,
        "language": j.Language,
        "genre": j.Genre,
        "director": j.Director,
        "poster": j.Poster
      })
    })
  },
  infofilm (req, res)  {
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        try{
          const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)
	        const id = new ObjectId(req.params.fid)
          collection.find({_id:id}).toArray((err, result) => {
            if(err) {
              res.status(500).send({"status":500, "description":err})
            } else {
              res.send(result)
            }
          })
        }catch(err) {
            res.status(501).send({'status': 501, 'description': 'The film ID is not valid'})
        } finally{      
          db.close()
        }
      }
    })
  },

  addfilm (req, res) {    
    const timestamp = new Date()
    console.log(`${timestamp.toString()} - [${req.ip}] Trying to insert film record to DB`)
    const k = req.body.s
    const film = req.body.film
    checkAuth(k).then(() => {      
      mongoClient.connect(CONNECTION_URI, (err, db)=>{
        if(err){
          console.log(err)
          res.status(500).send({"status": 500, "description": err})
        } else {
          const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)
          collection.insertOne(film, (err) => {
            if(err) {
             res.status(500).send({"status":500, "description":err})
            } else {
              res.status(201).send({"status":201, "description": "Data insert successfully"})
            }
          })
          db.close()
        }
      })
    })
    .catch(()=> {
      res.status(403).send({"status": 403, "description": "No rights"})
    })
  },  
  listAll(req, res) {
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)
        collection.find({}).toArray((err, result) => {
          if(err) {
            res.status(500).send({"status":500, "description":err})
          } else {
            res.send(result)
          }
        })
        db.close()
      }
    })
  },
  removefilm(req, res) {

  }

}

module.exports = filmController
