const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.daily);
router.get('/weekly', homeController.weekly);
router.get('/add-habit', homeController.addHabit);
router.get('/get-habit', homeController.getHabit);
router.post('/create', homeController.create);
router.get('/delete', homeController.delete);
router.post('/update', homeController.update);
router.post('/update-status', homeController.updateStatus);
router.post('/update-weekly-status', homeController.updateWeeklyStatus);

module.exports = router;