// backend/Routes/EmployeesRouter.js
const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../Middlewares/Auth');
const User = require('../Models/User'); // Adjust the path if necessary

// Define your employees endpoint
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const employees = await User.find(); // Fetch employees from the User model
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
