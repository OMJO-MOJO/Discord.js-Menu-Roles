const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = (client) => {
   client.on("interactionCreate", (interaction) => {
      if (interaction.customId !== "remove-role-from-menu") {
         return;
      }

      if (!interaction.member.permissions.has("MANAGE_ROLES")) {
         return interaction.reply({ content: `❌ - You do not have the \`MANAGE_ROLES\` permission.`, ephemeral: true });
      }

      const oldEmbed = interaction.message.embeds[0];
      const oldRoleList = oldEmbed.fields[0].value.split(`\n`);
      let embed = new EmbedBuilder()
         .setTitle(oldEmbed.title)
         .setDescription(oldEmbed.description)
         .setColor(oldEmbed.color)
         .setFooter(oldEmbed.footer);

      let roleList = [];
      for (const line of oldRoleList) {
         const roleId = line.split(" - ")[0].replace(/[<@&>]/g, "");

         if (interaction.values[0] === roleId) {
            continue;
         }

         roleList.push(line);
      }

      let disabled = false;
      if (roleList < 1) {
         disabled = true;
      } else {
         embed.addFields({
            name: "Menu Roles",
            value: roleList.join(`\n`),
         });
      }

      const buttons = new ActionRowBuilder().addComponents(
         new ButtonBuilder().setCustomId("menu-add-role").setLabel("Add Role").setStyle(ButtonStyle.Success).setEmoji("➕"),

         new ButtonBuilder().setCustomId("menu-remove-role").setStyle(ButtonStyle.Danger).setLabel("Remove Role").setEmoji("✖").setDisabled(disabled),

         new ButtonBuilder()
            .setCustomId("menu-confirm-role")
            .setStyle(ButtonStyle.Primary)
            .setLabel("Confirm Selection")
            .setEmoji("✔")
            .setDisabled(disabled)
      );

      interaction.update({ embeds: [embed], components: [buttons] });
   });
};
