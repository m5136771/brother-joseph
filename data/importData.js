const fs = require('fs');
const mongoose = require('mongoose');
const { Volume, Book, Chapter, Verse } = require('./models');
const { mongoUri } = require('../config.json');

const processJSON = async (filePath) => {
	const rawData = fs.readFileSync(filePath);
	const jsonData = JSON.parse(rawData);

	for (const data of jsonData) {
		const {
			volumeId,
			bookId,
			chapterId,
			verseId,
			volume_title,
			book_title,
			volume_long_title,
			book_long_title,
			volume_subtitle,
			book_subtitle,
			volume_short_title,
			book_short_title,
			volume_lds_url,
			book_lds_url,
			chapter_number,
			verse_number,
			scripture_text,
			verse_title,
			verse_short_title
		} = data;

		console.log(`Checking ${verseId}`);
		let volume = await Volume.findOne({volumeId: volumeId});
		if (!volume) {
			console.log(`adding Volume ${volumeId}...`);
			volume = new Volume({
				volumeId: volumeId,
				volume_title,
				volume_long_title,
				volume_subtitle,
				volume_short_title,
				volume_lds_url
			});
			await volume.save();
		}

		let book = await Book.findOne({bookId: bookId});
		if (!book) {
			console.log(`adding Book ${bookId}...`);
			book = new Book({
				bookId: bookId,
				volume: volume.Id,
				book_title,
				book_long_title,
				book_subtitle,
				book_short_title,
				book_lds_url
			});
			await book.save();
		}

		let chapter = await Chapter.findOne({chapterId: chapterId});
		if (!chapter) {
			console.log(`adding Chapter ${chapterId}...`);
			chapter = new Chapter({
				chapterId: chapterId,
				book: book.Id,
				chapter_number
			});
			await chapter.save();
		}

		let verse = await Verse.findOne({verseId: verseId});
		if (!verse) {
			console.log(`adding Verse ${verseId}...`);
			verse = new Verse({
				verseId: verseId,
				chapter: chapter.Id,
				verse_number,
				scripture_text,
				verse_title,
				verse_short_title
			});
			await verse.save();
		}
	}

	console.log('Data imported successfully');
	mongoose.connection.close();
};

const main = async () => {
	try {
		await mongoose
			.set('strictQuery', false)
			.connect(mongoUri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		console.log('Connected to DB.');

		const filePath = './lds-scriptures.json';
		await processJSON(filePath);
	} catch (err) {
		console.log(err);
	} finally {
		mongoose.connection.close();
	}
};

main();