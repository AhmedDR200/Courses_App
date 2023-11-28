// Description: Courses controller

// Models
const Course = require('../models/course');

// Express Validation Middleware
const {body, validationResult} = require('express-validator');

// Status
const status = require('../utils/httpstatus');

// Error handling middleware
const asyncWrapper = require('../middlewares/asyncWrapper');

// Validators
const validateCourse = [ 
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min:2}),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isNumeric()
        .withMessage('Price must be a number')
        .isLength({min:3})
        .withMessage('Price must be at least 3 digits long')
]

// Controllers
const getAll = asyncWrapper(
    async (req, res) => {
        const query = req.query;

        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;

        const courses = await Course.find({},{
            "__v": false,
        }).limit(limit).skip(skip);
        res.json({
            Status: true,
            Message: 'Courses found',
            Data: {courses}
        })
});


const getOne = asyncWrapper(
    async(req, res) => {
        const course = await Course.findById(req.params.id)
        if(!course) res.status(404).send('The course with the given ID was not found.');
        res.status(200).json({
            Status: true,
            Message: 'Course found',
            Data: {course}
        });
});


const create = async(req, res) => {
    console.log(req.body);

    const errors = validationResult(req);

    console.log(errors);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const newCourse = new Course(req.body)
    await newCourse.save();

    res.status(201).json({
        Status: true,
        Message: 'Course created successfully',
        Course: newCourse
    });
}


const update = async(req, res) => {
    const id = req.params.id;
    const updateCourse = await Course.updateOne({_id:id}, {$set: {... req.body}});

    if (!Course) {
        return res.status(404).json({
            Status: false,
            Message: 'Course not found'
        });
    }

    res.status(200).json({
        Status: true,
        Message: 'Course updated successfully',
        Course: updateCourse
    });
}


const remove = async(req, res) => {
   const course = await Course.deleteOne({_id: req.params.id});

    res.status(200).json({
        Status: true,
        Message: 'Course deleted successfully',
        Data: null
    });
}


// Exports
module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    validateCourse
}