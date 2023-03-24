const Router = require('koa-router')
const bodyParser = require ('koa-bodyparser')
const filmModel = require('../model/film')
const filmRoute = new Router({prefix: '/api/v2'})
const axios = require('axios')
const {validateFilm} = require('../controllers/filmValidation')

const getAllFilms = async (ctx, next) =>{
  const film = await filmModel.getAllFilms()
  if(film) {
    ctx.status = 200
    ctx.body = film
  } else {
    ctx.status = 500
    ctx.body = {"description": "Database connection error"}
  }
  await next()
}

const omdbapi = async(ctx, next) => {
  const url = 'http://www.omdbapi.com'
  const APIkey = "54441395"
  const title = ctx.params.title    

  try {
      const { data, status } = await axios.get(`${url}?apikey=${APIkey}&t=${title}`)      
      ctx.status = 200
      ctx.body = {
        "title": data.Title,
        "year": data.Year,
        "released": data.Released,
        "runtime": data.Runtime,
        "language": data.Language,
        "genre": data.Genre,
        "director": data.Director,
        "poster": data.Poster
      }
    }catch(err){
      ctx.status = 500
      ctx.body = {"status": 500, "description": `API call failed: ${err}`}
    } finally{
      await next()
    }   
}

const getFilmDetails = async (ctx, next) => {
  const id = ctx.params.fid 
  const info = await filmModel.getFilmByID(id)
  if(info) {
    ctx.status = 200
    ctx.body = info
  } else {
    ctx.status = 404
    ctx.body = {"description": "data not found"}
  }  
  await next()
}

const addFilm = async (ctx, next) => {  
  const body = ctx.request.body
  const film = body.film
  const key = ctx.get('k')
  // 

  try{
    const u = await userModel.findByKey(k)    
    if (u[0].type == 1) {
      let result = await filmModel.addFilm(film)
      if(result.status == 201) {
        ctx.status = result.status
        ctx.body = {id: result.id}
      } else {
        ctx.status = result.status
        ctx.body = {description: "Failed to add"}
      }
    } else {
      ctx.status = 403
      ctx.body = {description: "No access right"}
    }
  }catch(err) {
    ctx.status = 401
    ctx.body = {description: "Invalid Access"}    
  }
  
  
  await next()
}


filmRoute.get('/films', getAllFilms)
filmRoute.get('/ofilm/:title', omdbapi)
filmRoute.get('/film/:fid', getFilmDetails)
filmRoute.post('/film', bodyParser(), validateFilm, addFilm)

module.exports = filmRoute