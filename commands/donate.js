const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { donateRow } = require('../components/action-rows')

const embed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle('Support the Project')
	.setDescription('By donating to this project, you are not only helping to keep the bot running, but also supporting its future development and improvements. Your donations will directly benefit you by:')
	.addFields(
		{ name: '1. Ensuring Regular Updates', value: 'Your contributions allow us to spend more time developing and updating the bot.', inline: false },
		{ name: '2. Priority Support', value: 'Donors receive priority support for any issues or questions related to the bot.', inline: false },
		{ name: '3. Exclusive Features', value: 'As a thank you for your support, donors gain access to exclusive features.', inline: false },
	)
	.setFooter({ text: 'Thank you for your support!' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('donate')
		.setDescription('Support the project through donations.'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [donateRow],
		});
	},
};