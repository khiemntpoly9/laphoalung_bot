/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
const request = require('request');
require('dotenv').config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
//
const getUserInfo = (sender_psid, callback) => {
	request(
		{
			uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
			method: 'GET',
			fields: 'first_name, last_name',
		},
		(err, res, body) => {
			if (!err && res.statusCode == 200) {
				const user = JSON.parse(body);
				callback(user);
			} else {
				console.log(err);
			}
		},
	);
};
//
let callSendAPI = (sender_psid, response) => {
	// Construct the message body
	let request_body = {
		recipient: {
			id: sender_psid,
		},
		message: response,
	};
	// Send the HTTP request to the Messenger Platform
	request(
		{
			uri: 'https://graph.facebook.com/v16.0/me/messages',
			qs: { access_token: PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: request_body,
		},
		(err, res, body) => {
			if (!err) {
				console.log('Đã gửi tin nhắn!');
			} else {
				console.error('Không thể gửi tin nhắn:' + err);
			}
		},
	);
};

module.exports = { callSendAPI, getUserInfo };
