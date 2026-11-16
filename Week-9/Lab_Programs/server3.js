const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const recordSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const Record = mongoose.model('Record', recordSchema);

app.post('/records', async (req, res) => {
    try {
        const record = new Record(req.body);
        await record.save();

        res.status(201).json({
            message: "Record created successfully",
            record
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/records', async (req, res) => {
    try {
        const records = await Record.find();
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/records/:id', async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);

        if (!record)
            return res.status(404).json({
                message: "Record not found"
            });

        res.json(record);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
});

app.put('/records/:id', async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!record)
            return res.status(404).json({
                message: "Record not found"
            });

        res.json({
            message: "Record updated successfully",
            record
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/records/:id', async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);

        if (!record)
            return res.status(404).json({
                message: "Record not found"
            });

        res.json({
            message: "Record deleted successfully"
        });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
