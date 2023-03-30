const { ButtonBuilder, ButtonStyle } = require('discord.js');


/* Scripture Volume Buttons */
const buttonOT = new ButtonBuilder()
	.setCustomId('ot')
	.setLabel('Old Testament')
	.setDisabled(false)
	.setStyle('Primary');

const buttonNT = new ButtonBuilder()
	.setCustomId('nt')
	.setLabel('New Testament')
	.setDisabled(false)
	.setStyle('Primary');

const buttonBOM = new ButtonBuilder()
	.setCustomId('bom')
	.setLabel('Book of Mormon')
	.setDisabled(false)
	.setStyle('Success');

const buttonDC = new ButtonBuilder()
	.setCustomId('dc')
	.setLabel('Doctrine and Covenants')
	.setDisabled(false)
	.setStyle('Success');

const buttonPGP = new ButtonBuilder()
	.setCustomId('pgp')
	.setLabel('Pearl of Great Price')
	.setDisabled(false)
	.setStyle('Success');


/* Donate Buttons */
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
	buttonOT, buttonNT, buttonBOM, buttonDC, buttonPGP,
	buttonPatreon, buttonPayPal, buttonWebsite
};