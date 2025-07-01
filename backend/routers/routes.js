const express = require('express');
const router = express.Router();
const authRoutes = require('./authRouter');
const tatvaRoutes = require('./tatvaRouter');
const questionaryAiRoutes = require('./questionaryAiRouter');

router.use("/auth", authRoutes)
router.use("/tatva", tatvaRoutes)
router.use('/ai', questionaryAiRoutes)


module.exports = router;
