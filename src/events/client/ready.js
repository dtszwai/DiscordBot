module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} has logged into Discord!`);
    client.user.setPresence({
      activities: [
        {
          name: `🔗 github.com/dtszwai`,
          type: `online`,
        },
      ],
    });

    setTimeout(client.checkVideo, 1000 * 5);
  },
};