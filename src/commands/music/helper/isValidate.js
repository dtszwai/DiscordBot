const play = require("play-dl");

module.exports = (link) => {
  switch (play.yt_validate(link)) {
    case "video":
    case "playlist":
      console.log("true");
      return true;
    case "search":
    default:
      console.log("false");
      return false;
  }
};
