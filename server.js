const express = require('express');
const path = require('path');
const app = express();

// Serve static files (CSS, images, icons, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Import Services Routes
const servicesRouter = require('./routes/services');
app.use('/services', servicesRouter);

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

// Career Routes

// Career Page: List career opportunities
app.get('/careers', (req, res) => {
    res.render('career/career'); // career.ejs file inside the career folder
});

// Career Opportunities Page: Show available career options
app.get('/careers/opportunities', (req, res) => {
    res.render('career/career-opportunities'); // career-opportunities.ejs inside the career folder
});

// Application Form Routes (Updated)
app.get('/careers/register-business', (req, res) => {
    res.render('career/register-business-form'); // Now directly redirects to Register Business Form
});

app.get('/careers/full-time-job', (req, res) => {
    res.render('career/job-application-form'); // Directly opens Full-time job application form
});

app.get('/careers/part-time-job', (req, res) => {
    res.render('career/job-application-form'); // Directly opens Part-time job application form
});

app.get('/careers/work-from-home', (req, res) => {
    res.render('career/job-application-form'); // Directly opens Work from Home application form
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
