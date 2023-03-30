const fs = require('fs');
const rawData = fs.readFileSync('data/book-of-mormon.json');
const bomData = JSON.parse(rawData);

const { createPages, createPageButtons, updateEmbedWithPage } = require('../../helpers/pagination');
const { createChapterSelectMenu } = require('../../components/menus/chapterSelectMenu');
const { createVerseSelectMenu } = require('../../components/menus/verseSelectMenu');


module.exports = {
	customId: 'selectBoMBook',
	description: 'description',

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const selectedBookIndex = interaction.values[0].split('_').slice(-1)[0];
		const bookInfo = bomData.books.find(book => book.index === selectedBookIndex);

		const chapterSelectMenuRow = createChapterSelectMenu(bookInfo);

		const embedInfo = {
			title: bookInfo.book,
			fields: [
				{ name: 'Chapter Count', value: bookInfo.chapterCount.toString() },
				{ name: 'Verse Count', value: bookInfo.verseCount.toString() },
				{ name: 'Time Span', value: bookInfo.timeSpan },
				{ name: 'Locations', value: bookInfo.locations },
				{ name: 'Major Events', value: bookInfo.events },
				{ name: 'Notable Characters', value: bookInfo.characters },
				{ name: 'Teachings', value: bookInfo.teachings },
			].filter(field => field.value && field.value.trim() !== ''),
		};

		const pages = createPages(embedInfo);
		const totalPages = pages.length;
		const pagesRow = createPageButtons(0, totalPages);

		const responseComponents = totalPages > 1 ? [pagesRow, chapterSelectMenuRow] : [chapterSelectMenuRow];

		const response = await interaction.editReply({
			ephemeral: true,
			embeds: [pages[0]],
			components: responseComponents,
			fetchReply: true
		}).catch(console.error);

		updateEmbedWithPage(response, pages).catch((error) => {
			if (error instanceof Error && error.message === 'Interaction timed out') {
				console.log('Pagination timed out');
			} else {
				console.error(error);
			}
		});

		interaction.client.on('interactionCreate', async (i) => {
			if (i.isSelectMenu() && i.customId === 'selectBoMChapter') {
				await i.deferUpdate();

				const selectedChapter = parseInt(i.values[0].split('_')[1]);
				const verseSelectMenuRow = createVerseSelectMenu(bookInfo, selectedChapter);
				const currentComponents = i.message.components;

				// Replace or add the verse select menu row
				const verseSelectMenuRowIndex = currentComponents.findIndex(component => component.type === 'ACTION_ROW' && component.components[0].customId === 'selectBoMVerse');
				if (verseSelectMenuRowIndex >= 0) {
					currentComponents[verseSelectMenuRowIndex] = verseSelectMenuRow;
				} else {
					currentComponents.push(verseSelectMenuRow);
				}

				await i.message.edit({ components: currentComponents });
			}
		});
	},
};