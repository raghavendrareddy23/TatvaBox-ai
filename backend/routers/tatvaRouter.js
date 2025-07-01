const express = require('express');
const {
  getAllTatvas, getRandomTatva,getTatvaById,
  createTatva, updateTatva, deleteTatva
} = require('../controllers/tatvaController');
const { isAuthenticated, isAdmin } = require('../utils/authMiddleware');
const upload = require('../utils/multer'); 

const tatvaRouter = express.Router();

tatvaRouter.get('/random', getRandomTatva);
tatvaRouter.get('/', getAllTatvas);
tatvaRouter.get('/:id', getTatvaById);
tatvaRouter.post('/create',isAuthenticated, isAdmin,  upload.single('image'), createTatva);
tatvaRouter.put('/:id', isAuthenticated, isAdmin, upload.single('image'), updateTatva);
tatvaRouter.delete('/:id', isAuthenticated, isAdmin, deleteTatva);

module.exports = tatvaRouter;
