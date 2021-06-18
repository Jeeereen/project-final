const jwt = require ('jsonwebtoken')

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, '1234')
        req.userData = decoded
        next()
    }
    catch(error){
        return res.status(401).json({
            message: 'Your access is denied please login ( /user/login ) or signup ( /user/signup ) first'
        })
    }
}