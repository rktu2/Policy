const mongoose = require('mongoose');
const AgentSchema = new mongoose.Schema({
    agentname: String
});
module.exports = mongoose.model('Agent',agentSchema);