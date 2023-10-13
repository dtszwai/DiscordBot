const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unpause")
    .setDescription("Unpause the player."),
  async execute(interaction, client) {
    const locale = interaction.locale;
    const player = client.player;
    switch (player._state.status) {
      case "playing":
        await interaction.reply({
          content: client.t(locale)("music.unpause.notPaused"),
          ephemeral: true,
        });
        break;
      case "paused":
        player.unpause();
        await interaction.reply(client.t(locale)("music.unpause.unpaused"));
        break;
      default:
        await interaction.reply({
          content: client.t(locale)("music.unpause.emptyQueue"),
          ephemeral: true,
        });
    }
  },
};
