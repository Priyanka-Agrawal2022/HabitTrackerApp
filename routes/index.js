const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/add-habit', homeController.addHabit);
router.post('/create', homeController.create);

module.exports = router;