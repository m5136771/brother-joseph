const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

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
};

module.exports = {
	createChapterSelectMenu
};