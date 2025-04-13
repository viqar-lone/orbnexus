const express = require('express');
const path = require('path');
const app = express();

// Serve static files (CSS, images, icons, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets'))); // New assets folder for icons/images

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Import Services Routes
const servicesRouter = require('./routes/services');
app.use('/services', servicesRouter);

// Import Careers Routes
const careerRouter = require('./routes/career');
app.use('/careers', careerRouter);

// Route for Home Page
app.get('/', (req, res) => {
    res.render('index', { title: 'Orb Nexus - Event Management' });
});

// Route for Services Page
app.get('/services', (req, res) => {
    const services = [
        'Whole Wedding Packages',
        'Party Management',
        'Wedding Shoots',
        'Decoration for Events',
        'Catering',
        'Book Hall',
        'VIP Guest Management',
        'Hotel Rooms',
        'Wedding Tents',
        'Transport Facility'
    ];
    res.render('services', { services });
});

// Route for Full Wedding Package Page
app.get('/services/full-wedding-package', (req, res) => {
    res.render('services/full-wedding-package');
});

// Route for Contact Page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route for "Join Our Team"
app.get('/join', (req, res) => {
    res.render('join');
});

// Route for "Gallery"
app.get('/gallery', (req, res) => {
    res.render('gallery');
});

// Careers Routes (Redirections to Terms and Conditions)
app.get('/careers/register-business', (req, res) => {
    res.redirect('/careers/terms');
});

app.get('/careers/full-time', (req, res) => {
    res.redirect('/careers/terms');
});

app.get('/careers/part-time', (req, res) => {
    res.redirect('/careers/terms');
});

app.get('/careers/work-from-anywhere', (req, res) => {
    res.redirect('/careers/terms');
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = router;