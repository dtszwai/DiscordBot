const { InteractionType } = require("discord.js");

// Helper function to execute different interaction types
async function executeInteraction(interaction, client, type, errorMessage) {
  const handler = client[type].get(
    interaction.customId || interaction.commandName
  );
  if (!handler) {
    if (errorMessage) console.error(errorMessage);
    return;
  }

  try {
    await handler.execute(interaction, client);
  } catch (error) {
    console.error(error);
    if (errorMessage) {
      await interaction.reply({
        content: errorMessage,
        ephemeral: true,
      });
    }
  }
}

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    switch (true) {
      case interaction.isChatInputCommand():
        await executeInteraction(
          interaction,
          client,
          "commands",
          "Something went wrong while executing this command..."
        );
        break;

      case interaction.isButton():
        await executeInteraction(
          interaction,
          client,
          "buttons",
          "There is no code for this button"
        );
        break;

      case interaction.isStringSelectMenu():
        await executeInteraction(
          interaction,
          client,
          "selectMenus",
          "There is no code for this select menu."
        );
        break;

      case interaction.type === InteractionType.ModalSubmit:
        await executeInteraction(
          interaction,
          client,
          "modals",
          "There is no code for this modal."
        );
        break;

      case interaction.isContextMenuCommand():
        await executeInteraction(interaction, client, "commands");
        break;

      case interaction.isAutocomplete():
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
          await command.autocomplete(interaction, client);
        } catch (err) {
          console.error(err);
        }
        break;
    }
  },
};
