const { ButtonBuilder, ButtonStyle } = require('discord.js');

const newButton = new ButtonBuilder()
	.setCustomId('button')
	.setLabel('Button')
	.setDisabled(false)
	.setStyle(ButtonStyle.Primary);



module.exports = {
	newButton
};