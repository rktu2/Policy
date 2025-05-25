const scheduleMessage = require('../utils/scheduler.js');
const express = require('express');

const scheduler = async (req, res) => {
    const { message, day, time } = req.body;

    // Basic input validation
    if (!message || !day || !time) {
        return res.status(400).json({ error: 'Missing required fields: message, day, or time' });
    }

    try {
        await scheduleMessage(message, day, time);
        res.status(200).send('Message scheduled');
    } catch (error) {
        console.error('Scheduling failed:', error);
        res.status(500).json({ error: 'Failed to schedule message' });
    }
};

module.exports = {scheduler};
