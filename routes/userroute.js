const Router = require('koa-router')
const bodyParser = require ('koa-bodyparser')
//const filmModel = require('../model/film')
const userRoute = new Router({prefix: '/api/v2/user'})
const {validateUser} = require('../controllers/userValidation')
const auth = require('../controllers/auth')
const userModel = require('../model/user')

/*const auth = async (ctx, next) =>{
  await next()
}*/
const login = async (ctx, next) => {
  try{
    const key = await userModel.createKey(ctx.state.user)  
    ctx.status = 200
    ctx.body = {key: key}
  } catch (err){
    ctx.status = 500
    ctx.body = {description: 'Error while communicating the database'}
  } finally {
    await next()  
  }      
}

const getUserDetails = async (ctx, next) => {
  const k = ctx.get('k')
  try{
    const result = await userModel.findByKey(k)
    
    ctx.status = 200
    ctx.body = {
      username: result[0].uname,
      lastname: result[0].lastname,
      firstname: result[0].firstname,
      type: result[0].type
    }
  }catch(err) {
    ctx.status = 401
    ctx.body = {description: "Invalid Access"}    
  }
  await next()
}

const createUser = async (ctx, next) => {
  ctx.status = 501
  ctx.body = {description:'Oh no...'}
  await next()
}

const editUserDetails = async (ctx, next) => {
  const k = ctx.get('k')
  const body = ctx.request.body  
  try{
    const info = await userModel.findByKey(k)    
    const result = await userModel.updateInfo(info[0].uname, body)        
    if(result.status==201) {
      ctx.status = result.status
      ctx.body = {description: "information update successfully"}
    } else {
      ctx.status = 500
      ctx.body = {decription: "There should have some problems from the server"}
    }      
  }catch(err) {
    ctx.status = 401
    ctx.body = {description: `Invalid Access - ${err}`}    
  }
  await next()
}

userRoute.get('/', auth, login)
userRoute.get('/detail', bodyParser(), getUserDetails)
userRoute.post('/', bodyParser(), validateUser, createUser)
userRoute.put('/', bodyParser(), validateUser, editUserDetails)

module.exports = userRoute