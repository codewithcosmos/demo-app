// server/controllers/formController.js
const Form = require('../models/Form');

exports.submitForm = async (req, res) => {
    try {
        const formData = req.body;
        const form = await Form.create(formData);
        res.status(201).json({ message: 'Form submitted', form });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
