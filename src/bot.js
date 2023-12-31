require("dotenv").config();
const { token, MongoDBToken } = process.env;
const { connect } = require("mongoose");
const { Client, Collection } = require("discord.js");
const { createAudioPlayer } = require("@discordjs/voice");
const fs = require("fs");

const client = new Client({ intents: 32767 });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.player = createAudioPlayer();
client.playlist = [];
client.t = require("./i18n");

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
  await connect(MongoDBToken).catch(console.error);
})();
