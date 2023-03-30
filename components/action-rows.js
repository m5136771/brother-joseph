const { ActionRowBuilder } = require('discord.js');
const {
	buttonOT, buttonNT, buttonBOM, buttonDC, buttonPGP,
	buttonPatreon, buttonPayPal, buttonWebsite,
} = require('./buttons');
const {
	bomMenu, dcMenu, ntGospelMenu, ntMenu, otMenu1, otMenu2, pgpMenu
} = require('./menus/scriptureMenus');


const volumeRow = new ActionRowBuilder()
	.addComponents(buttonOT, buttonNT, buttonBOM, buttonDC, buttonPGP);

const bomRow = new ActionRowBuilder()
	.addComponents(bomMenu);
const dcRow = new ActionRowBuilder()
	.addComponents(dcMenu);
const otRow1 = new ActionRowBuilder()
	.addComponents(otMenu1);
const otRow2 = new ActionRowBuilder()
	.addComponents(otMenu2);
const ntGospelRow = new ActionRowBuilder()
	.addComponents(ntGospelMenu);
const ntRow = new ActionRowBuilder()
	.addComponents(ntMenu);
const pgpRow = new ActionRowBuilder()
	.addComponents(pgpMenu);


const donateRow = new ActionRowBuilder()
	.addComponents(buttonPatreon, buttonPayPal, buttonWebsite);


module.exports = {
	volumeRow,
	bomRow, dcRow, otRow1, otRow2, ntGospelRow, ntRow, pgpRow,
	donateRow
};