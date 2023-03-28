const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require('discord.js');

function createPages(embedInfo) {
	const pages = [];
	let currentPage = new EmbedBuilder().setTitle(embedInfo.title);
	let currentFieldCharCount = 0;
	let currentFieldCount = 0;

	for (const field of embedInfo.fields) {
		const fieldName = field.name.substring(0, 256);
		const fieldValueChunks = field.value.match(/[\s\S]{1,1024}/g) || [];
		let isFirstChunk = true;

		for (const fieldValue of fieldValueChunks) {
			let fieldCharCount = fieldName.length + fieldValue.length;
			let displayName = isFirstChunk ? fieldName : `${fieldName} (continued)`;

			if (currentFieldCharCount + fieldCharCount <= 6000 && currentFieldCount < 25) {
				currentPage.addFields({ name: displayName, value: fieldValue });
				currentFieldCharCount += fieldCharCount;
				currentFieldCount++;
			} else {
				pages.push(currentPage);
				currentPage = new EmbedBuilder().setTitle(embedInfo.title).addFields({ name: displayName, value: fieldValue });
				currentFieldCharCount = fieldCharCount;
				currentFieldCount = 1;
			}
			isFirstChunk = false;
		}
	}

	pages.push(currentPage);
	return pages;
};

function createPageButtons(currentPageIndex, totalPages) {
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('prev_page')
				.setLabel('◀')
				.setStyle('Secondary')
				.setDisabled(currentPageIndex === 0 || totalPages === 1),
			new ButtonBuilder()
				.setCustomId('next_page')
				.setLabel('▶')
				.setStyle('Secondary')
				.setDisabled(currentPageIndex === totalPages - 1 || totalPages === 1)
		);

	return row;
};

async function updateEmbedWithPage(interaction, pages) {
	const totalPages = pages.length;
	const filter = (i) => i.customId === 'prev_page' || i.customId === 'next_page';
	const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button });

	collector.on('collect', async (i) => {
		const currentPageIndex = interaction.embeds[0].footer
			? parseInt(interaction.embeds[0].footer.text.split(' ')[1]) - 1
			: 0;
		let newPageIndex = currentPageIndex;

		if (i.customId === 'prev_page') {
			newPageIndex = Math.max(0, currentPageIndex - 1);
		} else if (i.customId === 'next_page') {
			newPageIndex = Math.min(totalPages - 1, currentPageIndex + 1);
		}

		const newEmbed = pages[newPageIndex].setFooter({ text: `Page ${newPageIndex + 1} of ${totalPages}` });

		// Update the button states
		const pagesRow = createPageButtons(newPageIndex, totalPages);

		await i.update({ embeds: [newEmbed], components: [pagesRow] });
	});

	collector.on('end', (collected, reason) => {
		if (reason === 'time') {
			console.log('Pagination timed out');
		} else {
			console.error(`Pagination ended with reason: ${reason}`);
		}
	});
}


module.exports = { createPages, createPageButtons, updateEmbedWithPage };