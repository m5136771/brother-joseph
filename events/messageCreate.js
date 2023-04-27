const { Events } = require('discord.js');
const { checkForScripture } = require('../helpers/scriptureParsing');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		console.log(`Message received: ${message}`);
		// Ignore messages from bots
		if (message.author.bot) return;

		const verseData = checkForScripture(message.content);

		if (verseData) {
			message.react('📖').then(message.react('📫'));
		}
	}
};