const fs = require('fs');
const rawData = fs.readFileSync('data/doctrine-and-covenants.json');
const dcData = JSON.parse(rawData);

const { dcRow } = require('../../components/action-rows');
const { createPages, createPageButtons, updateEmbedWithPage } = require('../../helpers/pagination');

const embedInfo = {
	title: dcData.title_page.title,
	color: dcData.color,
	thumbnail: dcData.thumbnail_link,
	description: dcData.description,
	fields: [
		{ name: 'Number of Books', value: (dcData.book_count ? dcData.book_count.toString() : ''), inline: true },
		{ name: 'Time Span', value: dcData.time_span, inline: true },
		{ name: 'Translated From', value: dcData.translations.translation_from },
		{ name: 'Translated To', value: dcData.translations.translation_to },
		{ name: 'Notable Characters', value: dcData.notable_characters },
		{ name: 'Major Events', value: dcData.major_events },
		{ name: 'Important Locations', value: dcData.important_locations },
		{ name: 'Importance Today', value: dcData.importance_today },
		{ name: 'Church of Jesus Christ Link', value: `[Go to ChurchofJesusChrist.org](${dcData.churchOfJesusChrist_link})` },
		{ name: 'Come Unto Christ Link', value: `[Go to ComeUntoChrist.org](${dcData.comeUntoChrist_link})` },
		{ name: 'Wikipedia Link', value: `[Go to Wikipedia](${dcData.wikipedia_link})` }
	].filter(field => field.value && field.value.trim() !== ''),
};

const pages = createPages(embedInfo);
const totalPages = pages.length;

module.exports = {
	customId: 'dc',
	description: 'description',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const pagesRow = createPageButtons(0, totalPages);

		const response = await interaction.editReply({
			ephemeral: true,
			embeds: [pages[0]],
			components: totalPages > 1 ? [pagesRow, dcRow] : [dcRow],
			fetchReply: true
		}).catch(console.error);

		updateEmbedWithPage(response, pages).catch((error) => {
			if (error instanceof Error && error.message === 'Interaction timed out') {
				console.log('Pagination timed out');
			} else {
				console.error(error);
			}
		});
	},
};
