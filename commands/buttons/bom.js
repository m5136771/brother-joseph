const fs = require('fs');
const rawData = fs.readFileSync('data/book-of-mormon.json');
const bomData = JSON.parse(rawData);

const { bomRow } = require('../../components/action-rows');
const { createPages, createPageButtons, updateEmbedWithPage } = require('../../helpers/pagination');

const embedInfo = {
	title: bomData.title_page.title,
	color: bomData.color,
	thumbnail: bomData.thumbnail_link,
	description: bomData.description,
	fields: [
		{ name: 'Number of Books', value: (bomData.book_count ? bomData.book_count.toString() : ''), inline: true },
		{ name: 'Time Span', value: bomData.time_span, inline: true },
		{ name: 'Translated From', value: bomData.translations.translation_from },
		{ name: 'Translated To', value: bomData.translations.translation_to },
		{ name: 'Notable Characters', value: bomData.notable_characters },
		{ name: 'Major Events', value: bomData.major_events },
		{ name: 'Important Locations', value: bomData.important_locations },
		{ name: 'Importance Today', value: bomData.importance_today },
		{ name: 'Church of Jesus Christ Link', value: `[Go to ChurchofJesusChrist.org](${bomData.churchOfJesusChrist_link})` },
		{ name: 'Come Unto Christ Link', value: `[Go to ComeUntoChrist.org](${bomData.comeUntoChrist_link})` },
		{ name: 'Wikipedia Link', value: `[Go to Wikipedia](${bomData.wikipedia_link})` }
	].filter(field => field.value && field.value.trim() !== ''),
};

const pages = createPages(embedInfo);
const totalPages = pages.length;

module.exports = {
	customId: 'bom',
	description: 'description',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const pagesRow = createPageButtons(0, totalPages);

		const response = await interaction.editReply({
			ephemeral: true,
			embeds: [pages[0]],
			components: totalPages > 1 ? [pagesRow, bomRow] : [bomRow],
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
