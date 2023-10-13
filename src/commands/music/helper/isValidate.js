const play = require("play-dl");

module.exports = (link) => {
  if (!link.startsWith("http")) return false;
  switch (play.yt_validate(link)) {
    case "video":
    case "playlist":
      return true;
    case "search":
    default:
      return false;
  }
};
