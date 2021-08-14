const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlBuses = require('../controllers/bus.controller');

//User registration and authentication
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);

//Bus details
router.post('/postBuses', ctrlBuses.postBuses);
router.post('/getBuses',ctrlBuses.getBuses);
router.patch('/updateDetails',ctrlBuses.updateDetails);

module.exports = router;