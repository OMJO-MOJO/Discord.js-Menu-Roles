const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder().setName("new-select-menu").setDescription("Create a new Menu Role"),

   async execute(interaction) {
      if (!interaction.member.permissions.has("MANAGE_ROLES")) {
         return interaction.reply(`❌ - You do not have the \`MANAGE_ROLES\` permission.`);
      }

      // Create the embed
      const embed = new EmbedBuilder()
         .setTitle("Menu Select Roles")
         .setColor(process.env.COLOR)
         .setFooter({ text: process.env.message, iconURL: process.env.icon })
         .setDescription(
            `Start by adding some roles to the select menu!
           
           Click "Confirm Selection" once you are satisfied with the role selection.`
         );

      // Generate some buttons
      const buttons = new ActionRowBuilder().addComponents(
         new ButtonBuilder().setCustomId("menu-add-role").setLabel("Add Role").setStyle(ButtonStyle.Success).setEmoji("➕"),

         new ButtonBuilder().setCustomId("menu-remove-role").setStyle(ButtonStyle.Danger).setLabel("Remove Role").setEmoji("✖").setDisabled(true),

         new ButtonBuilder()
            .setCustomId("menu-confirm-role")
            .setStyle(ButtonStyle.Primary)
            .setLabel("Confirm Selection")
            .setEmoji("✔")
            .setDisabled(true)
      );

      interaction.reply({ embeds: [embed], components: [buttons] });
   },
};
