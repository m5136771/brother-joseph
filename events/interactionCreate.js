const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	execute(interaction) {

		if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isStringSelectMenu()) return;

		const buttonCommand = interaction.client.buttonCommands.get(interaction.customId);
		const menuCommand = interaction.client.menuCommands.get(interaction.customId);
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command && !buttonCommand && !menuCommand) return;

		if (interaction.isChatInputCommand()) {
			try {
				console.log(`╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌\n⤷ 😀 ${interaction.member.displayName}: Executing 〈 / ${interaction.commandName} 〉 slash command in ⟦ #${interaction.channel.name} ⟧\n`);
				command.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: `🚫 There was an error while executing 〈 / ${interaction.commandName} 〉 in ⟦ #${interaction.channel.name} ⟧\n`,
					ephemeral: true,
				});
			}
		};

		const bookInfo = interaction.message ? global.bookInfoMap.get(interaction.message.id) : null;


		if (interaction.isButton()) {
			if (bookInfo && (interaction.customId.startsWith('pagination') || interaction.customId.startsWith(`select${bookInfo.book}Chapter_`))) {
				// Update chapter buttons based on pagination
				const direction = interaction.customId.split('_')[1] === 'next' ? 1 : -1;
				const newStartChapter = Math.max(1, parseInt(interaction.message.components[0].components[0].label.split(' ')[1]) + 20 * direction);
			
				const newChapterButtons = createChapterButtons(bookInfo, newStartChapter);
				const newChapterRows = [];
				for (let i = 0; i < newChapterButtons.length; i += 5) {
					newChapterRows.push(
						new ActionRowBuilder().addComponents(newChapterButtons.slice(i, i + 5))
					);
				}
			
				let newComponents = newChapterRows;
				newComponents.push(paginationRow);
				if (totalPages > 1) {
					newComponents.push(pagesRow);
				}
			
				interaction.update({ components: newComponents });
			} else {
				try {
					console.log(`╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌\n⤷ 😀 ${interaction.member.displayName}: Executing 〈⦿  ${interaction.customId} 〉 button command in ⟦ #${interaction.channel.name} ⟧\n`);
					buttonCommand.execute(interaction);
				} catch (error) {
					console.error(error);
					interaction.reply({
						content: `🚫 There was an error while executing 〈 ⦿ ${interaction.customId} 〉 in ⟦ #${interaction.channel.name} ⟧\n`,
						ephemeral: true,
					});
				}
			}
			global.bookInfoMap.delete(interaction.message.id);
		};

		if (interaction.isStringSelectMenu()) {
			try {
				console.log(`╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌\n⤷ 😀 ${interaction.member.displayName}: Executing 〈 ☰ ${interaction.customId} 〉 menu command in ⟦ #${interaction.channel.name} ⟧\n`);
				menuCommand.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({
					content: `🚫 There was an error while executing 〈 ☰ ${interaction.customId} 〉 in ⟦ #${interaction.channel.name} ⟧\n`,
					ephemeral: true,
				});
			}
		};
	},
};
