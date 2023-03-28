const { EmbedBuilder } = require('discord.js');
const { bomRow } = require('../../components/action-rows');

const embed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle('Book of Mormon')
	.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/e/e5/Mormon-book.jpg')
	.setDescription('Another Testament of Jesus Christ, a record of God\'s dealings with ancient inhabitants of the Americas.')
	.addFields(
		{ name: 'Number of Books', value: '15', inline: true },
		{ name: 'Pages', value: '531', inline: true },
		{ name: 'Words', value: '268,163', inline: true },
		{ name: 'Time Span', value: 'Approx. 2200 BC - 421 AD' },
		{ name: 'Major Locations', value: 'Jerusalem, Arabian Peninsula, Ancient Americas' },
		{ name: 'Major Events', value: 'Lehi\'s family journey, Nephite and Lamanite wars, visit of Jesus Christ' },
		{ name: 'Notable Characters', value: 'Lehi, Nephi, Alma, Moroni, Mormon' },
		{ name: 'Importance Today', value: 'Provides spiritual guidance, testifies of Jesus Christ, clarifies doctrines' }
	);

module.exports = {
	customId: 'bom',
	description: 'description',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		await interaction.editReply({
			ephemeral: true,
			embeds: [embed],
			components: [bomRow]
		}).catch(console.error);
	},
};