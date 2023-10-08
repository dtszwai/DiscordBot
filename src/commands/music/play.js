const { SlashCommandBuilder } = require("discord.js");
const { AudioPlayerStatus } = require("@discordjs/voice");
const joinChannel = require("./helper/joinChannel");
const addMusic = require("./helper/addMusic");
const isValidate = require("./helper/isValidate");
const getInfo = require("./helper/getInfo");
const embed = require("../tools/helper/embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play/ Add Youtube music.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Paste a Youtube video Link.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const link = interaction.options.getString("link");
    if (!isValidate(link)) {
      return await interaction.reply({
        content: `No audio could be found for \`${link}\`.`,
        ephemeral: true,
      });
    }
    const connection = await joinChannel(interaction);
    if (!connection) return;
    else connection.subscribe(player);

    const { player, playlist } = client;
    await addMusic(playlist, link);
    if (player.state.status != AudioPlayerStatus.Playing) {
      player.play(playlist.shift());
    }
    player.on(AudioPlayerStatus.Idle, () => {
      playlist.length > 0 && player.play(playlist.shift());
    });

    const videoInfo = await getInfo(link);

    const _embed = embed({
      title: videoInfo.title,
      color: 0x18e1ee,
      image: videoInfo.thumbnail_url,
      author: {
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      },
      url: link,
    });

    return await interaction.reply({
      content: `${interaction.user} has added a song to the queue.`,
      embeds: [_embed],
    });
  },
};
