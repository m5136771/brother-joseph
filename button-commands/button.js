const { EmbedBuilder, ComponentType } = require('discord.js');
const { actionRow } = require('../assets/action-rows');

module.exports = {
	customId: 'customId',
	description: 'description',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		

		await interaction.editReply(
			{ ephemeral: true, embeds: [finEmbed], components: [] },
		).catch(console.error);
	},
};