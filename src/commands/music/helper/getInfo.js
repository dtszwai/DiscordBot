const { joinVoiceChannel } = require("@discordjs/voice");
const play = require("play-dl");

module.exports = async (link) =>
  await fetch(`https://noembed.com/embed?dataType=json&url=${link}`).then(
    (res) => res.json()
  );
