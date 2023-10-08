# DiscordBot - Bringing Harmony to Your Discord Server

Built with NodeJS.

A Discord bot that allows you to play YouTube music and enhance the musical experience on your Discord server.

## Features

| Feature       | Command | Description                                    |
| ------------- | ------------ | ---------------------------------------------- |
| Play Music    | `/play`      | Play YouTube music or add tracks to the queue. |
| Stop Playback | `/stop`      | Stop the music player.                         |
| Pause         | `/pause`     | Pause playback.                                |
| Resume        | `/unpause`   | Resume playback.                               |

### In progress

| Feature                       | Command | Description                                                                           |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| Subscribe to YouTube Channels | -            | Subscribe to YouTube channels and receive notifications when new videos are uploaded. |
| Mini-Games                    | -            | Engage in various mini-games.                                                         |

## Configurations

1. Before running the program, you need to create your own bot.

   To create a bot, visit https://discord.com/developers/applications

2. Get the bot token, update the `.env` file in the project root directory and provide the following variables:

   ```bash
   token=your_bot_token_here
   clientId=your_bot_client_id_here
   guildId=your_guild_id_here
   MongoDBToken=your_mongodb_token_here
   ```

3. Invite it to your Discord server. Once you run the bot, you can see `(BOTNAME#ID) has logged into Discord!`