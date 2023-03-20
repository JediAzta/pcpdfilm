const express = require('express')
const router = express.Router()
const filmController = require('./filmcontroller')
const userController = require('./usercontroller')

router.get('/infofilm/:title', filmController.qfilm) //
router.post('/imfilm', filmController.addfilm) //
router.get('/film/:fid', filmController.infofilm) //
router.get('/list', filmController.listAll) //
router.post('/auth', userController.login) //
router.post('/apply', userController.createuser)
router.put('/update', userController.updateuser) //

router.use((req, res, next) => {
  console.log('Invalid access~')
  res.status(404).send({'status':404, 'description': 'Endpoint not found'})  
})

module.exports = router