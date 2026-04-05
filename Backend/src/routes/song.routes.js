const express = require('express');
const router = express.Router();
const songModel = require('../models/song.model')
const upload = require('../middlewares/upload.middleware');
const { uploadSong } = require('../controllers/song.controller');
const { getSong } = require('../controllers/song.controller')

router.post('/', upload.single('song'), uploadSong)
router.get('/', getSong)



module.exports = router;