const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { volumeRow } = require('../components/action-rows');

const embed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle('Scriptures')
	.setDescription('Select a volume of scripture to explore:')
	.addFields(
		{ name: 'Old Testament', value: 'The sacred writings of the Jewish people, containing the history and teachings of the ancient Israelites.' },
		{ name: 'New Testament', value: 'The sacred writings of Christianity, chronicling the life and teachings of Jesus Christ and His apostles.' },
		{ name: 'Book of Mormon', value: 'Another Testament of Jesus Christ, a record of God\'s dealings with ancient inhabitants of the Americas.' },
		{ name: 'Doctrine and Covenants', value: 'A collection of revelations and inspired declarations given for the establishment and regulation of The Church of Jesus Christ of Latter-day Saints.' },
		{ name: 'Pearl of Great Price', value: 'A collection of revelations, translations, and writings by Joseph Smith, the founder of The Church of Jesus Christ of Latter-day Saints.' }
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scripture')
		.setDescription('Find & display scripture passages.'),

	async execute(interaction) {

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [volumeRow],
		});
	},
};
