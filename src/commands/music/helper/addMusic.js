const play = require("play-dl");
const { createAudioResource } = require("@discordjs/voice");

module.exports = async (playlist, link) => {
  const stream = await play.stream(link);
  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });
  playlist.push(resource);
};
