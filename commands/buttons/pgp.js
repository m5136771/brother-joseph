const fs = require('fs');
const rawData = fs.readFileSync('data/pearl-of-great-price.json');
const pgpData = JSON.parse(rawData);

const { pgpRow } = require('../../components/action-rows');
const { createPages, createPageButtons, updateEmbedWithPage } = require('../../helpers/pagination');

const embedInfo = {
	title: pgpData.title_page.title,
	color: pgpData.color,
	thumbnail: pgpData.thumbnail_link,
	description: pgpData.description,
	fields: [
		{ name: 'Number of Books', value: (pgpData.book_count ? pgpData.book_count.toString() : ''), inline: true },
		{ name: 'Time Span', value: pgpData.time_span, inline: true },
		{ name: 'Translated From', value: pgpData.translations.translation_from },
		{ name: 'Translated To', value: pgpData.translations.translation_to },
		{ name: 'Notable Characters', value: pgpData.notable_characters },
		{ name: 'Major Events', value: pgpData.major_events },
		{ name: 'Important Locations', value: pgpData.important_locations },
		{ name: 'Importance Today', value: pgpData.importance_today },
		{ name: 'Church of Jesus Christ Link', value: `[Go to ChurchofJesusChrist.org](${pgpData.churchOfJesusChrist_link})` },
		{ name: 'Come Unto Christ Link', value: `[Go to ComeUntoChrist.org](${pgpData.comeUntoChrist_link})` },
		{ name: 'Wikipedia Link', value: `[Go to Wikipedia](${pgpData.wikipedia_link})` }
	].filter(field => field.value && field.value.trim() !== ''),
};

const pages = createPages(embedInfo);
const totalPages = pages.length;

module.exports = {
	customId: 'pgp',
	description: 'description',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const pagesRow = createPageButtons(0, totalPages);

		const response = await interaction.editReply({
			ephemeral: true,
			embeds: [pages[0]],
			components: totalPages > 1 ? [pagesRow, pgpRow] : [pgpRow],
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
