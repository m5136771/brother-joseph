const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle('Brother Joseph Bot Commands')
	.setDescription('A list of available commands:')
	.addFields(
		{ name: '`help`', value: 'Shows this help message' },
		{ name: '`donate`', value: 'Support the project through donations' },
		{ name: '`help`', value: 'Shows this help message' }
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