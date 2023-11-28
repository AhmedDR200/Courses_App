const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("token",decoded);
        next();
    }
    catch(err){
        return res.status(401).json({
            Status: false,
            Message: 'Invalid token',
            Data: null
        });
    }
}


module.exports = verifyToken;