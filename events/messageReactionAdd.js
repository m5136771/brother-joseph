const { Events, EmbedBuilder } = require('discord.js');
const { checkForScripture } = require('../helpers/scriptureParsing');

const cooldowns = new Map();

module.exports = {
	name: Events.MessageReactionAdd,
	async execute(messageReaction, user) {
		if (user.bot) return;
		if (messageReaction.emoji.name === '📖') {
			const now = Date.now();
			const cooldown = cooldowns.get(messageReaction.message.id);
			if (cooldown && now < cooldown + 180000) return;
			cooldowns.set(messageReaction.message.id, now);

			const verseData = checkForScripture(messageReaction.message.content);

			if (verseData) {
				const embed = new EmbedBuilder()
					.setTitle(verseData.verse_title)
					.setDescription(verseData.scripture_text);

				messageReaction.message.reply({ embeds: [embed] })
					.then(() => console.log(`Scripture embed sent for ${user.tag}`))
					.catch(console.error);
			}
		} else if (messageReaction.emoji.name === '📫') {

			const verseData = checkForScripture(messageReaction.message.content);

			if (verseData) {
				const embed = new EmbedBuilder()
					.setTitle(verseData.verse_title)
					.setAuthor({ name: `Original message sent by: ${messageReaction.message.author.username}`, url: `${messageReaction.message.url}` })
					.setDescription(verseData.scripture_text);

				user.send({ embeds: [embed] })
					.then(() => console.log(`DM sent to ${user.tag}`))
					.catch(console.error);
			}
		}
	}
};