const express = require('express');
const router = express.Router();
const multer = require('multer');
const RegisterBusiness = require('../models/RegisterBusiness');
const path = require('path');

// Set up multer storage for images, videos, and resume
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Ensure the uploads folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add unique timestamp to file names
    }
});

// Multer filters for each file type (image, video, and resume)
const fileFilter = (req, file, cb) => {
    const fileTypes = {
        image: ['image/jpeg', 'image/png', 'image/jpg'],
        video: ['video/mp4', 'video/avi'],
        resume: ['application/pdf']
    };

    if (file.fieldname === 'images') {
        if (fileTypes.image.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid image format. Only jpg, jpeg, png are allowed.'));
        }
    } else if (file.fieldname === 'videos') {
        if (fileTypes.video.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid video format. Only mp4, avi are allowed.'));
        }
    } else if (file.fieldname === 'resume') {
        if (fileTypes.resume.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid resume format. Only PDF is allowed.'));
        }
    } else {
        cb(new Error('Invalid file type.'));
    }
};

// Initialize multer upload with the defined storage and file filter
const upload = multer({ storage, fileFilter });

// Handle business registration form submission with file uploads
router.post('/register-business', upload.fields([
    { name: 'images', maxCount: 20 },    // Maximum 20 images
    { name: 'videos', maxCount: 10 },    // Maximum 10 videos
    { name: 'resume', maxCount: 1 }      // Maximum 1 resume
]), async (req, res) => {
    const { businessName, partyName, businessLocation, businessType, contactNumber, email } = req.body;

    // Handle the file paths
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];
    const videos = req.files['videos'] ? req.files['videos'].map(file => file.path) : [];
    const resume = req.files['resume'] ? req.files['resume'][0].path : null;

    try {
        const newBusiness = new RegisterBusiness({
            businessName,
            partyName,
            businessLocation,
            businessType,
            contactNumber,
            email,
            images,   // Array of image paths
            videos,   // Array of video paths
            resume    // Resume path
        });

        await newBusiness.save(); // Save the business registration data in the database

        res.status(200).send('Business registration successful!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving business registration data.');
    }
});

module.exports = router;
