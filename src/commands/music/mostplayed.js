const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mostplayed")
    .setDescription("Show the most played songs."),
  async execute(interaction, client) {
    music = client.database.music;
    const musicArray = Object.entries(music);
    musicArray.sort((a, b) => b[1] - a[1]);
    const numToDisplay = Math.min(10, musicArray.length);
    let result = "";

    for (let i = 0; i < numToDisplay; i++) {
      const [key, value] = musicArray[i];
      result += `${value}. ${key}\n`;
    }
    await interaction.reply(
      result || client.t(interaction.locale)("music.mostplayed.emptyResult")
    );
  },
};
