const levenshtein = require('fast-levenshtein');
const scriptureData = require('../data/lds-scriptures.json');

const bookOfMormonBooks = [
	'1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni', 'Words of Mormon',
	'Mosiah', 'Alma', 'Helaman', '3 Nephi', '4 Nephi', 'Mormon', 'Ether', 'Moroni'
];

const bookAbbreviations = {
	'1Ne': '1 Nephi',
	'2Ne': '2 Nephi',
	'3Ne': '3 Nephi',
	'4Ne': '4 Nephi',
	'WofM': 'Words of Mormon',
	'WoM': 'Words of Mormon',
};

function findClosestBookName(inputName) {
	const abbreviation = Object.keys(bookAbbreviations).find(
		(key) => key.toLowerCase() === inputName.toLowerCase().replace(/\s/g, '')
	  );	  
	if (abbreviation) {
		return bookAbbreviations[abbreviation];
	}

	for (const book of bookOfMormonBooks) {
		const pattern = new RegExp(`^\\b\\d*\\s?${book}\\b`, 'i');
		if (pattern.test(inputName)) {
			return book;
		}
	}

	let closestBook = null;
	let minDistance = Infinity;

	for (const book of bookOfMormonBooks) {
		const distance = levenshtein.get(inputName, book);
		if (distance < minDistance) {
			minDistance = distance;
			closestBook = book;
		}
	}
	return closestBook;
}

function findVerse(book, chapter, verse) {

	for (const entry of scriptureData) {
		if (
			entry.book_title === book &&
			entry.chapter_number === chapter &&
			entry.verse_number === verse
		) {
			return entry;
		}
	}
	return null;
}

function checkForScripture(text) {
	const scripturePattern = /(\d*\s*\w+)\s+(\d+):(\d+)/i;
	const matches = text.match(scripturePattern);

	if (matches) {
		for (const reference of matches) {
			try {
				const matchResult = scripturePattern.exec(reference);
				const inputBookName = matchResult ? matchResult[1] : null;
				const correctedBookName = findClosestBookName(inputBookName);
				const correctedReference = reference.replace(inputBookName, correctedBookName);
				const correctedMatchResult = scripturePattern.exec(correctedReference);
				const chapter = parseInt(correctedMatchResult[2], 10);
				const verse = parseInt(correctedMatchResult[3], 10);
				const verseData = findVerse(correctedBookName, chapter, verse);

				if (verseData) {
					return verseData;
				} else {
					console.log(`Verse not found for ${verseData}`);
					return null;
				}

			} catch (error) {
				console.error(`Error fetching scripture for reference "${reference}":`, error);
			}
		}
	}
};

module.exports = {
	checkForScripture,
}