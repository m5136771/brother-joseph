const { ActionRowBuilder } = require('discord.js');
const {
	newButton
} = require('./buttons');

const actionRow = new ActionRowBuilder()
	.addComponents(newButton);



module.exports = {
	actionRow
};