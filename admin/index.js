const express = require('express')

const router = express.Router()


router.get('/main',function(request,response){
	response.send("hello")
})
router.get('/hello',function(request,response){
	response.send("hello")
})
router.get('/:college/student',function(request,response){
	response.send("Hello "+ request.params.college + request.query.hello)
})

module.exports = router
