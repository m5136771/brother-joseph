const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

function createVerseSelectMenu(chapterInfo) {
	const verses = Array.from(
		{ length: chapterInfo.verseCount },
		(_, i) => i + 1
	);

	const verseOptions = verses.map((verse) => ({
		label: `Verse ${verse}`,
		value: `verse_${verse}`,
	}));

	const versesSelectMenu = new StringSelectMenuBuilder()
		.setCustomId("selectVerse")
		.setPlaceholder("Select a verse")
		.addOptions(verseOptions);

	const row = new ActionRowBuilder().addComponents(versesSelectMenu);
	return row;
};

module.exports = {
	createVerseSelectMenu
};