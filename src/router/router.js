import express from 'express';
import mailController from '../controllers/mainController.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Server đang chạy trên Port 3000!');
});

router.get('/webhook', mailController.getWebhook);
router.post('/webhook', mailController.postWebhook);

export default router;
