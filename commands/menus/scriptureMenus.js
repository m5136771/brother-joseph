const { StringSelectMenuBuilder } = require('discord.js');

const bomBooks = [
	'1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni', 'Words of Mormon', 'Mosiah', 'Alma', 'Helaman',
	'3 Nephi', '4 Nephi', 'Mormon', 'Ether', 'Moroni'
];

const bomMenu = new StringSelectMenuBuilder()
	.setCustomId('selectBOMBook')
	.setPlaceholder('Select a Book')
	.addOptions(bomBooks.map((book, index) => {
		return {
			label: book,
			// description: `View ${book}`,
			value: `bomBook_${index}`
		};
	}));

const dcBooks = [
	'Doctrine and Covenants'
];

const dcMenu = new StringSelectMenuBuilder()
	.setCustomId('selectDCBook')
	.setPlaceholder('Select a Collection')
	.addOptions(dcBooks.map((book, index) => {
		return {
			label: book,
			// description: `View ${book}`,
			value: `dcBook_${index}`
		};
	}));

const ntGospels = [
	'Matthew', 'Mark', 'Luke', 'John'
];

const ntBooks = [
	'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
	'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
	'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

const ntGospelMenu = new StringSelectMenuBuilder()
	.setCustomId('selectNTGospel')
	.setPlaceholder('Select from the 4 Gospels')
	.addOptions(ntGospels.map((book, index) => {
		return {
			label: book,
			// description: `View ${book}`,
			value: `ntGospel_${index}`
		};
	}));

const ntMenu = new StringSelectMenuBuilder()
	.setCustomId('selectNTBook')
	.setPlaceholder('Select from other NT Books')
	.addOptions(ntBooks.map((book, index) => {
		return {
			label: book,
			// description: `View ${book}`,
			value: `ntBook_${index}`
		};
	}));


const otBooks1 = [
	'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
	'1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs'
];

const otBooks2 = [
	'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel',
	'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
];

const otMenu1 = new StringSelectMenuBuilder()
	.setCustomId('selectOTBook1')
	.setPlaceholder('From Genesis to Proverbs')
	.addOptions(otBooks1.map((book, index) => {
		return {
			label: book,
			// description: `View ${book}`,
			value: `otBook1_${index}`
		};
	}));

const otMenu2 = new StringSelectMenuBuilder()
	.setCustomId('selectOTBook2')
	.setPlaceholder('From Ecclesiastes to Malachi')
	.addOptions(otBooks2.map((book, index) => {
		return {
			label: book,
			// description: `View ${book}`,
			value: `otBook2_${index}`
		};
	}));


const pgpBooks = [
	'Moses', 'Abraham', 'Joseph Smith—Matthew', 'Joseph Smith—History', 'Articles of Faith'
];

const pgpMenu = new StringSelectMenuBuilder()
	.setCustomId('selectPGPBook')
	.setPlaceholder('Select a Book')
	.addOptions(pgpBooks.map((book, index) => {
		return {
			label: book,
			// description: `View ${book}`,
			value: `pgpBook_${index}`
		};
	}));


module.exports = {
	bomMenu, dcMenu, ntGospelMenu, ntMenu, otMenu1, otMenu2, pgpMenu
};
