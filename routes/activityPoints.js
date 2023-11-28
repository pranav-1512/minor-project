const express = require('express')
const router = express.Router()
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const Certificate = require('../models/certificates')

// cloudinary.config({
//     cloud_name: 'dbh6ctgel',
//     api_key: '624756742514515',
//     api_secret: 'U8NG5qbPMf5Oq_wodSD4-zzg1S4',
//   });

cloudinary.config({
    cloudinary_url: 'cloudinary://624756742514515:U8NG5qbPMf5Oq_wodSD4-zzg1S4@dbh6ctgel',
  });

const upload = multer({});

router.post('/upload-certificate', upload.single('certificate'), async (req, res) => {
    const { rollno, category } = req.body;
    const certificateFile = req.file;
    console.log(certificateFile)
  
    try {
      // Upload the file directly to Cloudinary
      const result = await cloudinary.uploader.upload(certificateFile.path, {
        resource_type: 'raw',
      });
  
      const certificateUrl = result.secure_url;
  
      // Save the certificate details to the database
      const certificate = new Certificate({ rollno, category, certificateUrl });
      certificate.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
        //   res.status(200).json({ message: 'Certificate uploaded successfully' });
        console.log('Success')
        }
      });
    } catch (error) {
      console.error('Error uploading certificate', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router