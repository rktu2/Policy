const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    policyNumber: { type: String, required: true },
    policyStartDate: { type: Date, required: true },
    policyEndDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    carrierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier', required: true }
});

module.exports = mongoose.model('Policy', PolicySchema);
