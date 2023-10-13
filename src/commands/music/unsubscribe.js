const { SlashCommandBuilder } = require("discord.js");

const fs = require("fs");

const path = `${__dirname}/../../json/subscription.json`;
const subscriptionList = () => {
  if (!fs.existsSync(path)) return;
  const rawData = fs.readFileSync(path);
  const jsonData = JSON.parse(rawData);
  return jsonData;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unsubscribe")
    .setDescription("Unsubscribe a Youtube Channel.")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("Youtube Channel.")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction, client) {
    const focusdValue = interaction.options.getFocused();
    const jsonData = subscriptionList();
    const channels = {};
    for (const [key, value] of Object.entries(jsonData)) {
      channels[key] = value;
    }
    const filtered = Object.keys(channels).filter((key) =>
      channels[key].title.includes(focusdValue)
    );
    await interaction.respond(
      filtered.map((channel) => ({
        name: channels[channel].title,
        value: channel,
      }))
    );
  },
  async execute(interaction, client) {
    const youtubeId = interaction.options.getString("id");

    const jsonData = subscriptionList();

    if (jsonData.hasOwnProperty(youtubeId)) {
      await interaction.reply({
        content: client.t(interaction.locale)("music.unsubscribe.success", {
          channel: jsonData[youtubeId].title,
        }),
      });
      delete jsonData[youtubeId];
      fs.writeFileSync(path, JSON.stringify(jsonData));
    } else {
      await interaction.reply({
        content: client.t(interaction.locale)(
          "music.unsubscribe.channelNotFound",
          {
            channel: youtubeId,
          }
        ),
      });
    }
  },
};
