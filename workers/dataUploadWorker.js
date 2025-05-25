const { parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');
const xlsx = require('xlsx');

mongoose.connect('mongodb://localhost:27017/policyDB');

const Agent = require('../models/agent');
const User = require('../models/user');
const Account = require('../models/account');
const Carrier = require('../models/carrier');
const Category = require('../models/category');
const Policy = require('../models/policy');

const processFile = async (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (let row of data) {
        const agent = new Agent({
            agentName: row.agentName,
        });
        await agent.save();
        //user saved
        const user = new User({
            firstName: row.firstName,
            dob: new Date(row.dob),
            address: row.address,
            phone: row.phone,
            state: row.state,
            zipCode: row.zipCode,
            email: row.email,
            gender: row.gender,
            userType: row.userType,
        });
        await user.save();
        // account saved
        const account = new Account({
            accountName: row.accountName,
            userId: user._id,
        });
        await account.save();
        // carrier saved
        let carrier = await Carrier.findOne({ companyName: row.companyName });
        if (!carrier) {
            carrier = new Carrier({ companyName: row.companyName });
            await carrier.save();
        }
        // category saved
        let category = await Category.findOne({ categoryName: row.categoryName });
        if (!category) {
            category = new Category({ categoryName: row.categoryName });
            await category.save();
        }
      // Policy saved
        const policy = new Policy({
            policyNumber: row.policyNumber,
            policyStartDate: new Date(row.policyStartDate),
            policyEndDate: new Date(row.policyEndDate),
            userId: user._id,
            carrierId: carrier._id,
            categoryId: category._id
        });
        await policy.save();
    }
};

processFile(workerData.filePath)
    .then(() => parentPort.postMessage('Upload complete'))
    .catch((err) => parentPort.postMessage(`Error: ${err.message}`));
