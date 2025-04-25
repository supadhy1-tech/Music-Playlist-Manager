const router = require('express').Router();
const authRoutes = require('./auth');
const homeRoutes = require('./home');
const playlistRoutes=require('./playlistRoutes');
const trackRoutes=require('./trackRoutes.js');
const userRoutes=require('./user');

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/my-playlists',playlistRoutes);
router.use('/my-playlists',trackRoutes);
router.use('/',userRoutes);

module.exports = router; 
