const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('Beep!'),
	async execute(interaction) {
		//const message = await interaction.reply({ content: '<:earlysupporter:1025813250455121990>', fetchReply: true })
    //message.react('😄');
    const message = await interaction.reply({ content: '<:earlysupporter:1025813250455121990>', fetchReply: true });
	const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'earlysupporter');
	message.react(reactionEmoji);
	},
};
