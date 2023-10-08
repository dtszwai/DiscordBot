const { ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = (
  id,
  label,
  style = ButtonStyle.Primary,
  emoji,
  disabled = false
) => {
  const button = new ButtonBuilder()
    .setLabel(label)
    .setStyle(style)
    .setDisabled(disabled);

  if (style == ButtonStyle.Link) {
    button.setURL(id);
  } else {
    button.setCustomId(id);
  }
  emoji && button.setEmoji(emoji);

  return button;
};
