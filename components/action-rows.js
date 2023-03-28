const { ActionRowBuilder } = require('discord.js');
const {
	buttonPrev, buttonNext,
	buttonOT, buttonNT, buttonBoM, buttonDC, buttonPoGP,
	buttonPatreon, buttonPayPal, buttonWebsite,
} = require('./buttons');
const {
	menuBoM
} = require('./menus');


const volumeRow = new ActionRowBuilder()
	.addComponents(buttonOT, buttonNT, buttonBoM, buttonDC, buttonPoGP);

const bomRow = new ActionRowBuilder()
	.addComponents(menuBoM);

const donateRow = new ActionRowBuilder()
	.addComponents(buttonPatreon, buttonPayPal, buttonWebsite);


module.exports = {
	volumeRow,
	bomRow,
	donateRow
};