const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/products', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        { name: "mobile", price: 10000 },
        { name: "tv", price: 20000 }
    ]);
});

router.get('/employees', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    // Fetch employees from the database
    const employees = [
        // Example data, replace with actual DB query
        {
            image: 'url/to/image',
            name: 'John Doe',
            email: 'john@example.com',
            mobile: '1234567890',
            designation: 'Developer',
            course: 'CS',
            gender: 'Male',
            createdAt: '2023-07-28'
        },
        // More employees...
    ];
    res.status(200).json(employees);
});

module.exports = router;
