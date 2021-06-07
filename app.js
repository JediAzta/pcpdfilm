#!/usr/bin/env node

'use strict'

const express = require('express')
const appRoute = require('./approute')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', appRoute)


const listener = app.listen(process.env.PORT || 18888, () => {
  console.log(`Server is ready at ${listener.address().port}`)
})
