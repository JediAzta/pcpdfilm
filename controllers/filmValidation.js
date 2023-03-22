const {Validator, ValidationError } = require('jsonschema')
const filmSchema = require('../schema/film.schema')
const v = new Validator()

exports.validateFilm = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body;
  try{
    v.validate(body, filmSchema, validationOptions)
    await next()
  } catch(err) {
    if(err instanceof ValidationError) {
      ctx.body = err
      ctx.status = 400
    } else {
      throw err
    }
  }
}