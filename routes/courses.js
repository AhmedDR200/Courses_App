const express = require('express');
const router = express.Router();
const userRoles = require('../utils/roles');


// Imports
let coursesController = require('../contrallers/courses');

// Routes

// GET /courses
router.get('/courses', coursesController.getAll);

// GET /courses/:id
router.get('/courses/:id', coursesController.getOne);

// POST /courses
router.post('/courses', coursesController.validateCourse, coursesController.create);

// PATCH /courses/:id
router.patch('/courses/:id', coursesController.validateCourse, coursesController.update);

// DELETE /courses/:id
router.delete('/courses/:id',coursesController.remove);


// Exports
module.exports = router;