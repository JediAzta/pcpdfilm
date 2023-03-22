#!/usr/bin/env node

'use strict'

const Koa = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const passport = require('koa-passport')
//const cors = require('cors')

const filmRoute = require('./routes/filmroute')
const userRoute = require('./routes/userroute')

const app = new Koa()

app.use(json())
app.use(logger())
//app.use(cors())
//app.use(passport.initialize())
app.use(filmRoute.routes())
app.use(userRoute.routes())

app.use(async(ctx, next)=>{
  try{    
    //console.log(ctx)
    if(ctx.status == 404) 
      ctx.body = {err: "Resource not found"}
  } catch(err) {
    ctx.body = {err: err}
  }
})


const listener = app.listen(process.env.PORT || 18888, () => {
  console.log(`Server is ready at ${listener.address().port}`)
})
