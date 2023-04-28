const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle('Brother Joseph Bot Commands')
	.setDescription('A list of available commands:')
	.addFields(
		{ name: '`help`', value: 'Shows this help message' },
		{ name: '`donate`', value: 'Support the project through donations' },
		{ name: '`Auto-Detection of Scripture References`', value: 'This feature automatically detects scripture references from the Book of Mormon mentioned in messages and responds with the corresponding verse text. [NOTE: As of now, it will only respond to the first reference found.] Users can easily read and discuss scriptures within the conversation without having to look them up separately. When a scripture reference is detected, the bot will react to the message with two emojis:\n\n📖: Clicking this will print the full text of the verse to the chat. (There is a 3 min. cooldown for this to avoid spam.)\n📫: Clicking this will send the text of the associated verse to you as a DM.' }
	)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('A list of available commands.'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [],
		});
	},
};