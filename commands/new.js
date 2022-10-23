const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('react'),
	async execute(interaction) {
		return interaction.reply('Boop!');
	},
};
