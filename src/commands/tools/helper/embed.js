const { EmbedBuilder } = require("discord.js");

module.exports = ({
  title,
  description,
  color,
  image,
  thumbnail,
  timestamp,
  author,
  footer,
  url,
  fields,
}) => {
  const embed = new EmbedBuilder();

  title && embed.setTitle(title);
  description && embed.setDescription(description);
  color && embed.setColor(color);
  image && embed.setImage(image);
  thumbnail && embed.setThumbnail(thumbnail);
  timestamp && embed.setTimestamp(timestamp);
  author && embed.setAuthor(author);
  footer && embed.setFooter(footer);
  url && embed.setURL(url);
  fields && embed.setFields(fields);

  return embed;
};
