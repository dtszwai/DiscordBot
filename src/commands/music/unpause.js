const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unpause")
    .setDescription("Unpause the player."),
  async execute(interaction, client) {
    const player = client.player;
    switch (player._state.status) {
      case "playing":
        await interaction.reply({
          content: "The player is not paused.",
          ephemeral: true,
        });
        break;
      case "paused":
        player.unpause();
        await interaction.reply("The player is now unpaused.");
        break;
      default:
        await interaction.reply({
          content: "The queue is empty.",
          ephemeral: true,
        });
    }
  },
};
