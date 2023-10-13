const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the player."),
  async execute(interaction, client) {
    const locale = interaction.locale;
    const player = client.player;
    switch (player._state.status) {
      case "playing":
        player.pause();
        await interaction.reply(client.t(locale)("music.pause.paused"));
        break;
      case "paused":
        await interaction.reply({
          content: client.t(locale)("music.pause.alreadyPaused"),
          ephemeral: true,
        });
        break;
      default:
        await interaction.reply({
          content: client.t(locale)("music.pause.noPlaying"),
          ephemeral: true,
        });
    }
  },
};
