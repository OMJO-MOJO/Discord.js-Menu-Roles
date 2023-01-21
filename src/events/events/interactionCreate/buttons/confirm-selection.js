const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
module.exports = (client) => {
   client.on("interactionCreate", async (interaction) => {
      if (interaction.customId !== "menu-confirm-role") {
         return;
      }

      if (!interaction.member.permissions.has("MANAGE_ROLES")) {
         return interaction.reply({ content: `❌ - You do not have the \`MANAGE_ROLES\` permission.`, ephemeral: true });
      }

      const modal = new ModalBuilder()
         .setCustomId("menu-role-channel")
         .setTitle("One Last Thing")
         .addComponents(
            new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                  .setCustomId("channel")
                  .setLabel("What channel must I send the select menu to?")
                  .setPlaceholder(`#${interaction.channel.name}`)
                  .setStyle(TextInputStyle.Short)
                  .setRequired(false)
            ),

            new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                  .setCustomId("title")
                  .setLabel("Add a title to the menu roles message")
                  .setPlaceholder("Self Assignable Roles")
                  .setStyle(TextInputStyle.Short)
                  .setRequired(false)
            ),

            new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                  .setCustomId("description")
                  .setLabel("Add a description to the menu roles message")
                  .setPlaceholder("Select some roles to add them to your profile, and this could include perks or access to channels.")
                  .setStyle(TextInputStyle.Paragraph)
                  .setRequired(false)
            ),

            new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                  .setCustomId("color")
                  .setLabel("Set the color of the embed. Must be Hex code")
                  .setPlaceholder("#ff00ff")
                  .setStyle(TextInputStyle.Short)
                  .setRequired(false)
            )
         );

      await interaction.showModal(modal);
   });
};
