const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { actionRow } = require('../assets/action-rows');

const embed = new EmbedBuilder()
	.setColor(0x000000)
	.setTitle('title')
	.setDescription('description')
	.addFields(
		{ name: 'name', value: 'value' }
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('name')
		.setDescription('description'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [actionRow],
		});
	},
};