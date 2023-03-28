const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

const bmBooks = [
	'1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni', 'Words of Mormon', 'Mosiah', 'Alma', 'Helaman',
	'3 Nephi', '4 Nephi', 'Mormon', 'Ether', 'Moroni'
];

const menuBoM = new StringSelectMenuBuilder()
	.setCustomId('selectBoMBook')
	.setPlaceholder('Select a Book')
	.addOptions(bmBooks.map((book, index) => {
		return {
			label: book,
			// description: `View ${book}`,
			value: `bmBook_${index}`
		};
	}));

function createChapterSelectMenu(bookInfo) {
	const chapters = Array.from(
		{ length: bookInfo.chapterCount },
		(_, i) => i + 1
	);

	const chapterOptions = chapters.map((chapter) => ({
		label: `Chapter ${chapter}`,
		value: `chapter_${chapter}`,
	}));

	const chaptersSelectMenu = new StringSelectMenuBuilder()
		.setCustomId("selectChapter")
		.setPlaceholder("Select a chapter")
		.addOptions(chapterOptions);

	const row = new ActionRowBuilder().addComponents(chaptersSelectMenu);
	return row;
}

module.exports = {
	menuBoM,
	createChapterSelectMenu
};
