/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
import request from 'request';
import { callSendAPI, getUserInfo } from '../services/chatbotService.js';
import * as dotenv from 'dotenv';
// .ENV
dotenv.config();
//
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
//
const mailController = {
	// Get webhook
	getWebhook: async (req, res) => {
		// Parse the query params
		let mode = req.query['hub.mode'];
		let token = req.query['hub.verify_token'];
		let challenge = req.query['hub.challenge'];
		// Check if a token and mode is in the query string of the request
		if (mode && token) {
			// Check the mode and token sent is correct
			if (mode === 'subscribe' && token === VERIFY_TOKEN) {
				// Respond with the challenge token from the request
				// console.log('WEBHOOK_VERIFIED');
				res.status(200).send(challenge);
			} else {
				// Respond with '403 Forbidden' if verify tokens do not match
				res.sendStatus(403);
			}
		}
	},
	postWebhook: async (req, res) => {
		// Parse the request body from the POST
		let body = req.body;
		// Check the webhook event is from a Page subscription
		if (body.object === 'page') {
			// Iterate over each entry - there may be multiple if batched
			body.entry.forEach(function (entry) {
				let webhook_event = entry.messaging[0];
				let sender_psid = webhook_event.sender.id;
				if (webhook_event.message) {
					handleMessage(sender_psid, webhook_event.message);
				} else if (webhook_event.postback) {
					handlePostback(sender_psid, webhook_event.postback);
				}
			});
			// Return a '200 OK' response to all events
			res.status(200).send('EVENT_RECEIVED');
		} else {
			// Return a '404 Not Found' if event is not from a page subscription
			res.sendStatus(404);
		}
	},
};

const handleMessage = async (sender_psid, received_message) => {
	let response;
	// Lấy thông tin user
	const user = await new Promise((resolve, reject) => {
		getUserInfo(sender_psid, (user) => {
			resolve(user);
		});
	});
	// Checks if the message contains text
	let greetings = ['hello', 'hi', 'hey'];
	if (received_message.text) {
		// Chào mừng
		if (greetings.includes(received_message.text)) {
			response = {
				text: `Chào ${user.first_name}, mình có thể giúp gì cho bạn? 😆`,
			};
		} else {
			response = {
				text: `Xin lỗi ${user.first_name}, mình chỉ là một con bot, mình không hiểu được những từ ngữ phức tạp!`,
			};
		}
	} else if (received_message.attachments) {
		response = {
			text: `Xin lỗi, mình không hiểu được tệp này!`,
		};
	}
	// Gọi hàm gửi tin nhắn
	callSendAPI(sender_psid, response);
};

const handlePostback = (sender_psid, received_postback) => {
	let response;
	// Get the payload for the postback
	let payload = received_postback.payload;
	// Set the response based on the postback payload
	switch (payload) {
		case 'yes':
			response = { text: 'Cảm ơn!' };
			break;
		case 'no':
			response = { text: 'Oops, xin lỗi!' };
			break;
		default:
			response = { text: 'Xin lỗi! Tôi không hiểu đáp án của bạn' };
	}
	// Send the message to acknowledge the postback
	callSendAPI(sender_psid, response);
};

export default mailController;
