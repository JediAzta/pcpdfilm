const dbMongo = require('../helpers/mongodb')
const {ObjectId} = require('mongodb')

exports.getAllFilms = async () => {
  const data = await dbMongo.run_query('films', {})
  return data
}

exports.getFilmByID = async (oid) => {
  try{
    const data = await dbMongo.run_query('films', {_id: new ObjectId(oid)})    
    return data
  } catch(err) {    
    throw (err)
  }
}

exports.addFilm = async (filmDetails) => {
  const data = await dbMongo.run_insert('films', filmDetails)  
  return data
}