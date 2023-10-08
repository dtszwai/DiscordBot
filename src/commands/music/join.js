const { SlashCommandBuilder } = require("discord.js");
const joinChannel = require("./helper/joinChannel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join Voice Channel."),
  async execute(interaction, client) {
    if (await joinChannel(interaction)) {
      return await interaction.reply({
        content: `Joining ${interaction.member.voice.channel.name}`,
      });
    }
  },
};
