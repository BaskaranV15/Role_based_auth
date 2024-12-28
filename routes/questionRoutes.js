const express = require('express');
const router = express.Router();
const { addQuestion, updateQuestion } = require('../controllers/questionController');
const verifyToken = require('../middleware/authMiddleware');
const roleMiddleware  = require('../middleware/roleMiddleware');

// Add a question (Admin only)
router.post('/', verifyToken, roleMiddleware('admin'), addQuestion);

// Update a question (Admin only)
router.put('/questions/:id', verifyToken, roleMiddleware(['admin']), updateQuestion);

router.get('/test', (req, res) => {
    res.status(200).json({ message: "Questions route is working!" });
});

module.exports = router;
