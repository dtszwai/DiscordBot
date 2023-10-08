const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop playing music."),
  async execute(interaction, client) {
    let connection = getVoiceConnection(interaction.guild.id);
    client.player.stop();
    connection?.disconnect();
    return await interaction.reply(`The queue has been emptied.`);
  },
};
