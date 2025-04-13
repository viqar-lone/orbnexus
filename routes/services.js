const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File Upload Configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Limit 50MB
});

// Handle Register Business Form Submission
router.post('/submit-register-business', upload.fields([{ name: 'images', maxCount: 20 }, { name: 'videos', maxCount: 10 }, { name: 'resume', maxCount: 1 }]), (req, res) => {
    const { businessName, partyName, businessLocation, businessType, contactNumber, emailID } = req.body;

    console.log('Business Registration Data:', {
        businessName,
        partyName,
        businessLocation,
        businessType,
        contactNumber,
        emailID,
        images: req.files?.images || [],
        videos: req.files?.videos || [],
        resume: req.files?.resume || []
    });

    res.send('Business registration submitted successfully.');
});

// Handle Full-time Staff Form Submission
router.post('/submit-full-time-job', upload.single('resume'), (req, res) => {
    const { partyName, fullName, contactNumber, emailID } = req.body;

    console.log('Full-time Job Application Data:', {
        partyName,
        fullName,
        contactNumber,
        emailID,
        resume: req.file || null
    });

    res.send('Full-time job application submitted successfully.');
});

// Handle Part-time Job Form Submission
router.post('/submit-part-time-job', upload.single('resume'), (req, res) => {
    const { partyName, fullName, contactNumber, emailID } = req.body;

    console.log('Part-time Job Application Data:', {
        partyName,
        fullName,
        contactNumber,
        emailID,
        resume: req.file || null
    });

    res.send('Part-time job application submitted successfully.');
});

// Handle Work from Anywhere Form Submission
router.post('/submit-work-from-home', upload.single('resume'), (req, res) => {
    const { partyName, fullName, contactNumber, emailID } = req.body;

    console.log('Work from Anywhere Application Data:', {
        partyName,
        fullName,
        contactNumber,
        emailID,
        resume: req.file || null
    });

    res.send('Work from Anywhere application submitted successfully.');
});

module.exports = router;
