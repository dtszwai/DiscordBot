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
    .setDescription("Play/ add a Youtube music.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Paste a Youtube video Link.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const locale = interaction.locale;
    const link = interaction.options.getString("link");
    const videoInfo = await getInfo(link);
    if (!isValidate(link) || !videoInfo) {
      return await interaction.reply({
        content: client.t(locale)("music.play.notFound", { link }),
        ephemeral: true,
      });
    }
    const { player, playlist } = client;
    const connection = await joinChannel(interaction);
    if (!connection) return;
    else client.connection = connection.subscribe(player);

    await addMusic(playlist, link);
    if (player.state.status != AudioPlayerStatus.Playing) {
      player.play(playlist.shift());
    }
    player.on(AudioPlayerStatus.Idle, () => {
      playlist.length > 0 && player.play(playlist.shift());
    });

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
      content: client.t(locale)("music.play.addSong", {
        user: interaction.user,
      }),
      embeds: [_embed],
    });
  },
};
