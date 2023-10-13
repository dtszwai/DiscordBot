module.exports = async (link) => {
  try {
    return await fetch(
      `https://noembed.com/embed?dataType=json&url=${link}`
    ).then((res) => res.json());
  } catch (err) {
    return false;
  }
};
