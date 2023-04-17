const express = require('express');
const router = express.Router();

const mailController = require('../controllers/mainController');

router.get('/', (req, res) => {
	res.send('Server đang chạy trên Port 3000!');
});

router.get('/webhook', mailController.getWebhook);
router.post('/webhook', mailController.postWebhook);

module.exports = router;
