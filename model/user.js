const dbMongo = require('../helpers/mongodb')

exports.createKey = async (username) =>{
  const key = Buffer.from((new Date()).toString()).toString('base64')  
  const done = await dbMongo.run_update('users', {uname: username[0].uname}, {key: key})
  if(done.status == 201)
    return key
  else 
    throw("Error to create key")
}

exports.findByUsername = async (username) => {
  const data = await dbMongo.run_query('users', {uname: username})
  if(data) {
    return data
  } else {
    throw ("user not exist")
  }
  
}

exports.findByKey = async(key) => {  
  const data = await dbMongo.run_query('users', {key: key})  
  if(data) {    
    return data
  } else {
    throw ("invalid key found")
  }
}

exports.updateInfo = async (username, content) =>{  
  console.log(username)
  console.log(content)
  const done = await dbMongo.run_update('users', {uname: username}, content)
  if(done.status == 201)
    return done
  else 
    throw("Error to update record")
}
