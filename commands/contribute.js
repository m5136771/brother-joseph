const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');

const contributeButton = new ButtonBuilder()
	.setCustomId('contribute')
	.setLabel('Contribute 🙏')
	.setStyle(ButtonStyle.Success);

const patreonButton = new ButtonBuilder()
	.setLabel('Patreon')
	.setURL('https://patreon.com/')
	.setStyle(ButtonStyle.Link);

const contributeRow = new ActionRowBuilder()
	.addComponents(contributeButton, patreonButton);


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
		.setName('contribute')
		.setDescription('Ways to contribute to this project'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [contributeRow],
		});
	},
};