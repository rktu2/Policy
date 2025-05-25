const schedule = require('node-schedule');
const mongoose = require('mongoose');
const Message = mongoose.model('Message', new mongoose.Schema({
    message: String,
    scheduledAt: Date,
}));

module.exports = function scheduleMessage(message, day, time) {
    const [hour, minute] = time.split(':').map(Number);
    const [year, month, date] = day.split('-').map(Number);

    const scheduledTime = new Date(year, month - 1, date, hour, minute);
    schedule.scheduleJob(scheduledTime, async () => {
        await new Message({ message, scheduledAt: new Date() }).save();
        console.log('Message inserted:', message);
    });
};
