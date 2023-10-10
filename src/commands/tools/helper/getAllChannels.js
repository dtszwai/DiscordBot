function getAllChannels(interaction, type) {
  const channels = interaction.guild.channels.cache.filter(
    (c) => c.type == type
  );
  const channelsArray = [];
  for (const channel of channels.values()) {
    channelsArray.push(channel);
  }
  return channelsArray;
}

module.exports = { getAllChannels };
