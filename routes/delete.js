const express = require('express');
const router = express.Router();
const UploadModel = require('../models/uploads');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/files');
console.log(filePath)

router.delete('/:id', async (req, res) => {
    try {
        const post = await UploadModel.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const fileToDelete = path.join(filePath, post.image);
        console.log(fileToDelete)
        if (!fs.existsSync(fileToDelete)) {
            return res.status(404).send('File not found');
        }

        fs.unlink(fileToDelete, async(err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).send('Error deleting file');
            }

            try {
                await UploadModel.findByIdAndDelete(req.params.id);
                res.send('Post and file deleted successfully');
            } catch (deleteErr) {
                console.error('Error deleting post:', deleteErr);
                return res.status(500).send('Error deleting post');
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
