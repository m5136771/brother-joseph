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

// In case of misspellings
function findClosestBookName(inputName) {
	console.log(`inputName: ${inputName}`);

	// Check for abbreviations
	const abbreviation = Object.keys(bookAbbreviations).find(
		(key) => key.toLowerCase() === inputName.toLowerCase().replace(/\s/g, '')
	  );	  
	if (abbreviation) {
		return bookAbbreviations[abbreviation];
	}

	for (const book of bookOfMormonBooks) {
		// Use a regex pattern to match book names with an optional number prefix and optional space
		const pattern = new RegExp(`^\\b\\d*\\s?${book}\\b`, 'i');
		if (pattern.test(inputName)) {
			console.log(`closestBook: ${book}`);
			return book;
		}
	}

	// If no match is found, fallback to the previous method
	let closestBook = null;
	let minDistance = Infinity;

	for (const book of bookOfMormonBooks) {
		const distance = levenshtein.get(inputName, book);
		if (distance < minDistance) {
			minDistance = distance;
			closestBook = book;
		}
	}
	console.log(`closestBook: ${closestBook}`);
	return closestBook;
}

// Function to find scripture text
function findVerse(book, chapter, verse) {
	console.log(`Book: ${book}`);
	console.log(`chapter: ${chapter}`);
	console.log(`verse: ${verse}`);

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
	console.log(`Checking text for scriptures: ${text}`);

	// Regular expression pattern to match a scripture reference, e.g., "Alma 41:6"
	const scripturePattern = /(\d*\s*\w+)\s+(\d+):(\d+)/i;

	// Find scripture references in the message content
	//returns an array[] with results
	const matches = text.match(scripturePattern);
	console.log(`matches: ${matches}`);

	if (matches) {
		for (const reference of matches) {
			console.log(`reference: ${reference}`);
			try {
				// Extract the book name from the reference
				const matchResult = scripturePattern.exec(reference);
				const inputBookName = matchResult ? matchResult[1] : null;

				// Correct misspellings
				const correctedBookName = findClosestBookName(inputBookName);

				// Replace the original book name in the reference with the corrected book name
				const correctedReference = reference.replace(inputBookName, correctedBookName);

				// Extract the chapter and verse numbers from the corrected reference
				const correctedMatchResult = scripturePattern.exec(correctedReference);
				const chapter = parseInt(correctedMatchResult[2], 10);
				const verse = parseInt(correctedMatchResult[3], 10);

				// Find the verse in the JSON data
				const verseData = findVerse(correctedBookName, chapter, verse);

				if (verseData) {
					// Do something with the found verse data
					console.log(`**${verseData.verse_title}**: ${verseData.scripture_text}`);
					return verseData;
				} else {
					console.log('Verse not found.');
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