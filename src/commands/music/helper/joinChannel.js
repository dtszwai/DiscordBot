const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = async (interaction) => {
  if (!interaction.member.voice.channel) {
    await interaction.reply({
      content: require("../../../i18n")(interaction.locale)(
        "music.join.notInChannel",
        { user: interaction.user }
      ),
      ephemeral: true,
    });
    return null;
  }
  return joinVoiceChannel({
    channelId: interaction.member.voice.channel.id,
    guildId: interaction.guild.id,
    adapterCreator: interaction.guild.voiceAdapterCreator,
    selfDeaf: false,
  });
};
