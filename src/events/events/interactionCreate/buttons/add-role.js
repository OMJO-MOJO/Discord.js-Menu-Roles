const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = (client) => {
   client.on("interactionCreate", async (interaction) => {
      if (interaction.customId !== "menu-add-role") {
         return;
      }

      if (!interaction.member.permissions.has("MANAGE_ROLES")) {
         return interaction.reply({ content: `❌ - You do not have the \`MANAGE_ROLES\` permission.`, ephemeral: true });
      }

      const modal = new ModalBuilder()
         .setCustomId("add-role-to-menu")
         .setTitle("Add a Role to the Selection Menu")
         .addComponents(
            new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                  .setCustomId("role")
                  .setLabel("Enter the role's name or the role's id.")
                  .setPlaceholder('"A Cool Role" or "632721433050480658"')
                  .setStyle(TextInputStyle.Short)
                  .setRequired(true)
            ),

            new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                  .setCustomId("description")
                  .setLabel("Add a description explaining the role")
                  .setPlaceholder("This role unlocks cool channels")
                  .setStyle(TextInputStyle.Short)
                  .setRequired(false)
            )
         );

      await interaction.showModal(modal);
   });
};
