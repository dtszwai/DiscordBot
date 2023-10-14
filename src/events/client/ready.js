const { ActivityType } = require("discord.js");
const Guild = require("../../schemas/guild");
const mongoose = require("mongoose");
require("dotenv").config();
const { guildId } = process.env;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} has logged into Discord!`);
    client.user.setPresence({
      activities: [
        {
          name: `🔗 github.com/dtszwai`,
          type: ActivityType.Custom,
        },
      ],
    });

    setTimeout(client.checkVideo, 1000 * 5);

    client.database = await Guild.findOne({ guildId });

    if (!client.database) {
      client.database = await new Guild({
        _id: new mongoose.Types.ObjectId(),
        guildId,
        music: {},
      });
      await client.database.save().catch(console.error);
    }
  },
};
