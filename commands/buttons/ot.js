const fs = require('fs');
const rawData = fs.readFileSync('data/old-testament.json');
const otData = JSON.parse(rawData);

const { otRow1, otRow2 } = require('../../components/action-rows');
const { createPages, createPageButtons, updateEmbedWithPage } = require('../../helpers/pagination');

const embedInfo = {
	title: otData.title_page.title,
	color: otData.color,
	thumbnail: otData.thumbnail_link,
	description: otData.description,
	fields: [
		{ name: 'Number of Books', value: (otData.book_count ? otData.book_count.toString() : ''), inline: true },
		{ name: 'Time Span', value: otData.time_span, inline: true },
		{ name: 'Translated From', value: otData.translations.translation_from },
		{ name: 'Translated To', value: otData.translations.translation_to },
		{ name: 'Notable Characters', value: otData.notable_characters },
		{ name: 'Major Events', value: otData.major_events },
		{ name: 'Important Locations', value: otData.important_locations },
		{ name: 'Importance Today', value: otData.importance_today },
		{ name: 'Church of Jesus Christ Link', value: `[Go to ChurchofJesusChrist.org](${otData.churchOfJesusChrist_link})` },
		{ name: 'Come Unto Christ Link', value: `[Go to ComeUntoChrist.org](${otData.comeUntoChrist_link})` },
		{ name: 'Wikipedia Link', value: `[Go to Wikipedia](${otData.wikipedia_link})` }
	].filter(field => field.value && field.value.trim() !== ''),
};

const pages = createPages(embedInfo);
const totalPages = pages.length;

module.exports = {
	customId: 'ot',
	description: 'description',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const pagesRow = createPageButtons(0, totalPages);

		const response = await interaction.editReply({
			ephemeral: true,
			embeds: [pages[0]],
			components: totalPages > 1 ? [pagesRow, otRow1, otRow2] : [otRow1, otRow2],
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
