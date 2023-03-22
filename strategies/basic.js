const { BasicStrategy } = require('passport-http')
const user = require('../model/user')

const verifyPassword = (user, password) => {
  return user.password === password
}

const checkUserAndPass = async (username, password, done) => {
  let result
  try {
    //console.log(username)
    result = await user.findByUsername(username)    
  } catch(err) {
    return done(err)
  }
  if(result) {
    if(verifyPassword(result, password)) {
      return done(null, user)
    } 
  }
  return done(null, false)
}

exports.strategy = new BasicStrategy(checkUserAndPass)