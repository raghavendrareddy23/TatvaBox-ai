const express = require('express');
const { askTatva } = require('../controllers/questionaryAiController');
const { isAuthenticated } = require('../utils/authMiddleware');
const questionaryAiRouter = express.Router();

questionaryAiRouter.post('/ask', isAuthenticated, askTatva);

module.exports = questionaryAiRouter;
