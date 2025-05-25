const express = require('express');
const { Worker } = require('worker_threads');
const Policy = require('../model/policy.js');
const User = require('../model/user.js');

const uploadData = async (req, res) => {
    try {
        const filePath = req.body.filePath;
        const worker = new Worker('../workers/dataUploadWorker.js', {
            workerData: { filePath }
        });

        worker.on('message', msg => {
            // Assuming msg is the final result
            res.send(msg);
        });

        worker.on('error', err => {
            console.error('Worker error:', err);
            res.status(500).send(err.message);
        });

        worker.on('exit', code => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const policySearch = async (req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({ firstName: username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const policy = await Policy.find({ userId: user._id });
        res.json(policy);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const aggregatePolicy = async (req, res) => {
    try {
        const agg = await Policy.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalPolicies: { $sum: 1 },
                }
            }
        ]);
        res.json(agg);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { uploadData, policySearch, aggregatePolicy };
