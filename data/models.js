const mongoose = require('mongoose');
const { Schema } = mongoose;

const volumeSchema = new Schema({
	volumeId: Number,
	volume_title: String,
	volume_long_title: String,
	volume_subtitle: String,
	volume_short_title: String,
	volume_lds_url: String
});

const bookSchema = new Schema({
	bookId: Number,
	volumeId: Number,
	book_title: String,
	book_long_title: String,
	book_subtitle: String,
	book_short_title: String,
	book_lds_url: String
});

const chapterSchema = new Schema({
	chapterId: Number,
	bookId: Number,
	chapter_number: Number
});

const verseSchema = new Schema({
	verseId: Number,
	chapterId: Number,
	verse_number: Number,
	scripture_text: String,
	verse_title: String,
	verse_short_title: String
});

const Volume = mongoose.model('Volume', volumeSchema);
const Book = mongoose.model('Book', bookSchema);
const Chapter = mongoose.model('Chapter', chapterSchema);
const Verse = mongoose.model('Verse', verseSchema);

module.exports = { Volume, Book, Chapter, Verse };