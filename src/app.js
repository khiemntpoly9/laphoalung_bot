import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import router from './router/router.js';
// .ENV
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CROS - Cho phép truy cập từ các domain khác như sau
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// Cookie Parser
app.use(cookieParser());

// routes
app.use(router);
// error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// start the server
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
