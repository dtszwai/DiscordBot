const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the player."),
  async execute(interaction, client) {
    const player = client.player;
    switch (player._state.status) {
      case "playing":
        player.pause();
        await interaction.reply("The player is now paused.");
        break;
      case "paused":
        await interaction.reply({
          content: "The player is already paused.",
          ephemeral: true,
        });
        break;
      default:
        await interaction.reply({
          content: "The player is not currently playing anything.",
          ephemeral: true,
        });
    }
  },
};
