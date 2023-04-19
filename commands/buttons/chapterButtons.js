const { ButtonBuilder, ButtonStyle } = require('discord.js');

function createChapterButtons(bookInfo, startChapter) {
	const chapters = bookInfo.chapterCount;
	const buttons = [];

	for (let i = startChapter; i < startChapter + 20 && i <= chapters; i++) {
		buttons.push(
			new ButtonBuilder()
				.setCustomId(`select${bookInfo.book}Chapter_${i}`)
				.setLabel(`Chapter ${i}`)
				.setStyle(ButtonStyle.Primary)
		);
	}

	return buttons;
}

module.exports = {
	createChapterButtons
};