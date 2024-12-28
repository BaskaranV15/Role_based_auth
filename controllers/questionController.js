const Question = require('../models/questionModel');


// Add Question
const addQuestion = async (req, res) => {
    try {
      const { question, optionA, optionB, optionC, optionD, answer } = req.body;
  
      // Validate input
      if (!question || !optionA || !optionB || !optionC || !optionD || !answer) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create a new question
      const newQuestion = new Question({ question, optionA, optionB, optionC, optionD, answer });
      await newQuestion.save();
  
      res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// Update a question
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from the URL
        const updatedData = req.body; // Get the new question data

        const question = await Question.findById(id); // Find the question by ID

        if (!question) {
            return res.status(404).json({ message: "Question not found" }); // Handle if question doesn't exist
        }

        // Update the question
        question.question = updatedData.question;
        question.optionA = updatedData.optionA;
        question.optionB = updatedData.optionB;
        question.optionC = updatedData.optionC;
        question.optionD = updatedData.optionD;
        question.answer = updatedData.answer;

        await question.save(); // Save the updated question

        res.status(200).json({ message: "Question updated successfully", question });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { addQuestion, updateQuestion };
