const express = require('express');
const router = express.Router();
const UploadModel = require('../models/uploads');
const mongoose = require('mongoose')



router.post('/:id', (req, res) => {
    const upComment = req.body.comment; // Assuming the comment is sent in the request body as JSON
    console.log(upComment, 'from backend');

    if (!upComment) {
        return res.status(400).send('No comment provided.');
    }

    UploadModel.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: upComment } },
        { new: true }
    )
   .then(updatedUpload => {
        if (!updatedUpload) {
            return res.status(404).send('No upload found with the given ID.');
        }
        res.send(updatedUpload);
        console.log(updatedUpload);
    })
   .catch(e => {
        console.error(e); // Log the error for debugging purposes
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    });
      


// router.post('/:id', (req, res) => {
//     const upComment = req.body.comment; // Assuming the comment is sent in the request body as JSON
//     console.log(upComment ,'from backend')
//     if (!upComment) {
//         return res.status(400).send('No comment provided.');
//     }

//     UploadModel.findByIdAndUpdate(
//         req.params.id,
//         { $push: { comments: upComment } },
//         { new: true }
//     )
//    .then(updatedUpload => {
//         if (!updatedUpload) {
//             return res.status(404).send('No upload found with the given ID.');
//         }
//         res.send(updatedUpload);
//         console.log(updatedUpload)
//     })
//    .catch(e => {
//         res.status(500).send(e);
//     });

});


// Add this to your existing router file
router.get('/:id', async (req, res) => {
    try {
        const upload = await UploadModel.findById(req.params.id);
        if (!upload) {
            return res.status(404).send('No upload found with the given ID.');
        }
        res.send(upload.comments);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
