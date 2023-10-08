const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = async (interaction) => {
  if (!interaction.member.voice.channel) {
    await interaction.reply({
      content: `${interaction.user}, You must be in a voice channel first.`,
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
