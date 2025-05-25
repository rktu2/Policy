const scheduleMessage = require('../utils/scheduler.js');
const express = require('express');
const router = express.Router();
const schedularctrl = require('../controller/schedularController.js')

router.post('/schedule-message',schedularctrl.scheduler);

module.exports = router;
    
