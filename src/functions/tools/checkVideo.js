require("dotenv").config;
const { guildId } = process.env;
const { EmbedBuilder } = require("discord.js");
const Parser = require("rss-parser");
const parser = new Parser();
const fs = require("fs");

module.exports = (client) => {
  client.checkVideo = async () => {
    const path = `${__dirname}/../../json/subscription.json`;
    if (!fs.existsSync(path)) return;
    const rawData = fs.readFileSync(path);
    const jsonData = JSON.parse(rawData);
    for (const channel in jsonData) {
      const data = await parser.parseURL(
        `https://youtube.com/feeds/videos.xml?channel_id=${channel}`
      );
      if (jsonData[channel].video !== data.items[0].id) {
        jsonData[channel].video = data.items[0].id;
        fs.writeFileSync(path, JSON.stringify(jsonData));
        const { title, link: url, id } = data.items[0];
        const embed = new EmbedBuilder({
          title,
          url,
          image: {
            url: `https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`,
          },
          author: {
            name: `${data.title} published a new video on Youtube.`,
            url,
          },
        });
        const guild = await client.guilds.fetch(guildId);
        const textChannel = await guild.channels.fetch(
          jsonData[channel].channelId
        );
        await textChannel.send({
          embeds: [embed],
        });
      }
    }
  };
};
