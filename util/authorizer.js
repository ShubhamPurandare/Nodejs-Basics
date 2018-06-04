var auth = function(req,res,next){
  if(req.user.role == "admin"){
	next()
  }else{
	res.status(401).send("UnAuthorized")
  }
}


module.exports = auth
