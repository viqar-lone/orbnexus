const express = require('express');
const mongoose = require('mongoose'); // MongoDB ODM
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, images, icons, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/orbnexusDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err);
});

// Import Services Routes
const servicesRouter = require('./routes/services');
app.use('/services', servicesRouter);

// Import Register Business Route
const registerBusinessRouter = require('./routes/registerBusiness');
app.use('/careers/register-business', registerBusinessRouter); 

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

// Career Opportunities Page
app.get('/careers/opportunities', (req, res) => {
    res.render('career/career-opportunities');
});

// Application Form Routes
app.get('/careers/register-business', (req, res) => {
    res.render('career/register-business-form');
});

app.get('/careers/full-time-job', (req, res) => {
    res.render('career/job-application-form');
});

app.get('/careers/part-time-job', (req, res) => {
    res.render('career/job-application-form');
});

app.get('/careers/work-from-home', (req, res) => {
    res.render('career/job-application-form');
});

// Shop Page Route
app.get('/shop', (req, res) => {
    const products = [
        {
            name: "Wedding Decoration Set",
            price: 500,
            imageUrl: "/images/deco1.jpg",
            description: "Beautiful wedding decorations."
        },
        {
            name: "Wedding Catering Package",
            price: 300,
            imageUrl: "/images/catering.jpg",
            description: "Delicious catering services."
        },
        // Add more products as necessary
    ];
    res.render('shop', { products });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
