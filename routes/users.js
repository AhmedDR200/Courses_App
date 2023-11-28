const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../contrallers/users');
const verifyToken = require('../middlewares/verifyToken');
const multer  = require('multer')

const deskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
  })
const upload = multer({ storage: deskStorage, fileFilter: function(req, file, cb){
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new Error('Not an image! Please upload only images.'), false);
    }
}});



// GET /users
router.route('/users')
    .get(verifyToken, userController.getAllUsers)


// POST /users/register
router.route('/register')
    .post(upload.single('avatar'),userController.register)


// POST /users/login
router.route('/login')
    .post(userController.login)



module.exports = router;