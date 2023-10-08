require("dotenv").config();
const { token, clientId } = process.env;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    const { commands, commandArray } = client;
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }
    const rest = new REST({ version: "9" }).setToken(token);
    try {
      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
