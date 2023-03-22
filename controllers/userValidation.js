const {Validator, ValidationError } = require('jsonschema')
const userSchema = require('../schema/user.schema')
const v = new Validator()

exports.validateUser = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body;
  try{
    v.validate(body, userSchema, validationOptions)
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