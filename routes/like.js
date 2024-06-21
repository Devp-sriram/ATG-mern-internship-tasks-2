const express = require('express');
const router = express.Router();
const UploadModel = require('../models/uploads');



router.get('/:id', async (req, res) => {
    try {
        const post = await UploadModel.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Return just the likes count
        res.json(post.likes);
    } catch (error) {
        console.error(error);
        if (error) {
            return res.status(404).json({ message: 'Invalid post ID' });
        }
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        // Increment the likes by 1
        const updatedDocument = await UploadModel.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true, runValidators: false }
        );

        if (!updatedDocument) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(updatedDocument);
    } catch (error) {
        console.error(error);
        if (error) {
            return res.status(404).json({ message: 'Invalid post ID' });
        }
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
});

module.exports = router;
