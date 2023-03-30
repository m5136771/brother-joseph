const fs = require('fs');
const rawData = fs.readFileSync('data/new-testament.json');
const ntData = JSON.parse(rawData);

const { ntGospelRow, ntRow } = require('../../components/action-rows');
const { createPages, createPageButtons, updateEmbedWithPage } = require('../../helpers/pagination');

const embedInfo = {
	title: ntData.title_page.title,
	color: ntData.color,
	thumbnail: ntData.thumbnail_link,
	description: ntData.description,
	fields: [
		{ name: 'Number of Books', value: (ntData.book_count ? ntData.book_count.toString() : ''), inline: true },
		{ name: 'Time Span', value: ntData.time_span, inline: true },
		{ name: 'Translated From', value: ntData.translations.translation_from },
		{ name: 'Translated To', value: ntData.translations.translation_to },
		{ name: 'Notable Characters', value: ntData.notable_characters },
		{ name: 'Major Events', value: ntData.major_events },
		{ name: 'Important Locations', value: ntData.important_locations },
		{ name: 'Importance Today', value: ntData.importance_today },
		{ name: 'Church of Jesus Christ Link', value: `[Go to ChurchofJesusChrist.org](${ntData.churchOfJesusChrist_link})` },
		{ name: 'Come Unto Christ Link', value: `[Go to ComeUntoChrist.org](${ntData.comeUntoChrist_link})` },
		{ name: 'Wikipedia Link', value: `[Go to Wikipedia](${ntData.wikipedia_link})` }
	].filter(field => field.value && field.value.trim() !== ''),
};

const pages = createPages(embedInfo);
const totalPages = pages.length;

module.exports = {
	customId: 'nt',
	description: 'description',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const pagesRow = createPageButtons(0, totalPages);

		const response = await interaction.editReply({
			ephemeral: true,
			embeds: [pages[0]],
			components: totalPages > 1 ? [pagesRow, ntGospelRow, ntRow] : [ntGospelRow, ntRow],
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
