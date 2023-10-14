const play = require("play-dl");
const { createAudioResource } = require("@discordjs/voice");

module.exports = async (playlist, link, database = null) => {
  const stream = await play.stream(link);
  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });
  playlist.push(resource);

  if (database) {
    if (!database.music) {
      database.music = {};
    }
    database.music[link] = (database.music[link] || 0) + 1;

    (async () => {
      await database.save();
    })();
  }
};
