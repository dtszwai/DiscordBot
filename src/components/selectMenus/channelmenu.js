const Parser = require("rss-parser");
const parser = new Parser();
const fs = require("fs");

module.exports = {
  data: {
    name: `channelmenu`,
  },
  async execute(interaction, client) {
    const [youtubeId, channelId] = interaction.values[0].split(",");
    const data = await parser.parseURL(
      `https://youtube.com/feeds/videos.xml?channel_id=${youtubeId}`
    );
    const path = `${__dirname}/../../json/subscription.json`;
    const isExist = fs.existsSync(path);
    let jsonData = {};
    if (isExist) {
      const rawData = fs.readFileSync(path);
      jsonData = JSON.parse(rawData);
    }

    fs.writeFileSync(
      path,
      JSON.stringify({
        ...jsonData,
        [youtubeId]: {
          title: data.title,
          video: data.items[0].id,
          channelId,
        },
      })
    );

    await interaction.update({
      content: client.t(interaction.locale)("music.subscribe.success", {
        title: data.title,
      }),
      components: [],
    });
  },
};
