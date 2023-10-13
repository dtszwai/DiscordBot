const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ChannelType,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");

const { getAllChannels } = require("../tools/helper/getAllChannels");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("subscribe")
    .setDescription(
      "Subscribe a Youtube Channel. Bot will notify when the channel has published a new video."
    )
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("Paste a Youtube Channel id.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const youtubeId = interaction.options.getString("id");

    const channelMenu = new StringSelectMenuBuilder()
      .setCustomId(`channelmenu`)
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder(`Select Channel`);
    const channels = getAllChannels(interaction, ChannelType.GuildText);
    for (const textChannel of channels) {
      channelMenu.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(textChannel.name)
          .setValue(`${youtubeId},${textChannel.id}`)
      );
    }

    await interaction.reply({
      content: client.t(interaction.locale)("music.subscribe.selectChannel"),
      components: [new ActionRowBuilder().addComponents(channelMenu)],
    });
  },
};
