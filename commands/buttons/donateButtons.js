const { ButtonBuilder } = require('discord.js');

const buttonPatreon = new ButtonBuilder()
	//.setCustomId('patreon')
	.setLabel('Patreon')
	.setDisabled(false)
	.setStyle('Link')
	.setURL('https://www.patreon.com/your_username');

const buttonPayPal = new ButtonBuilder()
	//.setCustomId('paypal')
	.setLabel('PayPal')
	.setDisabled(false)
	.setStyle('Link')
	.setURL('https://www.paypal.me/your_username');

const buttonWebsite = new ButtonBuilder()
	//.setCustomId('website')
	.setLabel('Website')
	.setDisabled(false)
	.setStyle('Link')
	.setURL('https://www.yourwebsite.com');

module.exports = {
	buttonPatreon, buttonPayPal, buttonWebsite
};