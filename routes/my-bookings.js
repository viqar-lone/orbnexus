const express = require('express');
const router = express.Router();

// Example Route for Bookings Page
router.get('/', (req, res) => {
    res.render('services/my-bookings'); // Assuming your .ejs file is in the services folder
});

module.exports = router;
