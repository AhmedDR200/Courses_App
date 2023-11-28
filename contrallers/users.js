const asyncWrapper = require('../middlewares/asyncWrapper');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getAllUsers = asyncWrapper(
    async (req, res) => {
        
        const query = req.query;

        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;

        const users = await User.find({},{
            "__v": false,
            "password": false
        }).limit(limit).skip(skip);
        res.json({
            Status: true,
            Message: 'users found',
            Data: {users}
        })
});

const register = asyncWrapper(
    async (req, res) => {
        try {
            const { name, email, password, isTeacher, isStudent, role } = req.body;

            // Password hashing
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                password: hashedPassword,
                isTeacher,
                isStudent,
                role
            });

            // Generate JWT token
            const token = await jwt.sign({email: user.email, id: user._id},process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            console.log(token);
            user.token = token;

            // Wait for the save operation to complete
            await user.save();
            res.status(201).json({
                Status: true,
                Message: 'User created',
                Data: { user }
            });
        } catch (error) {
            // Handle any errors that might occur during registration
            console.error(error);
            res.status(500).json({
                Status: false,
                Message: 'Error creating user',
                Data: null
            });
        }
    }
);


const login = asyncWrapper(
    async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                Status: false,
                Message: 'Email and password are required',
                Data: {}
            });
        }

        // Use await to get the user object from the query
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                Status: false,
                Message: 'User not found',
                Data: {}
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                Status: false,
                Message: 'Password is incorrect',
                Data: {}
            });
        }

        // Generate JWT token
        const token = await jwt.sign({email: user.email, id: user._id},process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        console.log(token);
        user.token = token;

        res.json({
            Status: true,
            Message: 'User logged in',
            Data: {token}
        });
    }
);






module.exports = {
    getAllUsers,
    register,
    login
}