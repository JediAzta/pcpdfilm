const passport = require('koa-passport')
const {BasicStrategy} = require('passport-http')
const user = require('../model/user')
//const basicAuth = require('../strategies/basic')

const verifyPassword = (user, password) => {  
  return user.password === password
}


passport.use(new BasicStrategy(async(username, password, done)=> {
  let result
  try {    
    result = await user.findByUsername(username)    
  } catch(err) {
    return done(err)
  }
  if(result) {       
    if(verifyPassword(result[0], password)) {
      console.log("done")
      return done(null, result)
    } 
  }
  return done(null, false)
}))

module.exports = async(ctx, next) => {
  await passport.authenticate("basic", {session: false})(ctx, next)
  if(ctx.status === 401) {
    ctx.body = {description: 'Not authorized'}
  }
}