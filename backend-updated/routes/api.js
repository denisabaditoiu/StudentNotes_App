const express = require('express')

const router = express.Router()

const usersController = require('../controllers/UsersController.js')

router.get('/users', usersController.findAll)
router.get('/users/:id', usersController.findOne)

const notesController = require('../controllers/NotesController.js')

router.get('/notes', notesController.findAll)
router.get('/notes/:id', notesController.findOne)
// router.get('/students/:id/homeworks',studentsController.getHomeworks)

// router.get('/notes/:id/users', notesController.findUsers)

module.exports = router