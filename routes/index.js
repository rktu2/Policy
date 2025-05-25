const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController.js');

router.post('/upload', apiController.uploadData);
router.get('/policy/search', apiController.policySearch);
router.get('/policy/aggregate', apiController.aggregatePolicy);

module.exports = router;
