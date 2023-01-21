const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = (client) => {
   client.on("interactionCreate", async (interaction) => {
      if (interaction.customId !== "add-role-to-menu") {
         return;
      }

      if (!interaction.member.permissions.has("MANAGE_ROLES")) {
         return interaction.reply({ content: `❌ - You do not have the \`MANAGE_ROLES\` permission.`, ephemeral: true });
      }

      const roleNameOrId = interaction.fields.getTextInputValue("role");
      const description = interaction.fields.getTextInputValue("description");
      let role = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === roleNameOrId.toLowerCase());

      if (!role) role = await interaction.guild.roles.cache.find((r) => r.id === roleNameOrId);

      if (!role) role = await interaction.guild.roles.cache.find((r) => r.name === roleNameOrId);

      if (!role)
         return interaction.reply({
            content: `❌ - I am unable to find a role with the name or id of \`${roleNameOrId}\``,
            ephemeral: true,
         });

      const oldEmbed = interaction.message.embeds[0];
      let roleList = oldEmbed.fields[0]?.value ? oldEmbed.fields[0].value : "";

      if (roleList.split(`\n`).length < 1) {
         roleList = `<@&${role.id}>${description !== "" ? ` - *${description}*` : ""}`;
      } else {
         // Check for duplicates
         for (const line of roleList.split(`\n`)) {
            const roleId = line.split(" - ")[0].replace(/[<@&>]/g, "");
            if (role.id === roleId) {
               return interaction.reply({
                  content: `❌ - You cannot add \`${role.name}\` again!`,
                  ephemeral: true,
               });
            }
         }

         roleList = roleList + `\n<@&${role.id}>${description !== "" ? ` - *${description}*` : ""}`;
      }

      let embed = new EmbedBuilder()
         .setTitle(oldEmbed.title)
         .setDescription(oldEmbed.description)
         .setColor(oldEmbed.color)
         .setFooter(oldEmbed.footer)
         .addFields({
            name: "Role List",
            value: roleList,
         });

      let reachedMax = false;
      if (roleList.split(`\n`).length === 15) {
         reachedMax = true;
         embed.setFooter({
            text: "You have reached the max number of roles!",
         });
      }

      const buttons = new ActionRowBuilder().addComponents(
         new ButtonBuilder().setCustomId("menu-add-role").setLabel("Add Role").setStyle(ButtonStyle.Success).setEmoji("➕").setDisabled(reachedMax),

         new ButtonBuilder().setCustomId("menu-remove-role").setStyle(ButtonStyle.Danger).setLabel("Remove Role").setEmoji("✖"),

         new ButtonBuilder().setCustomId("menu-confirm-role").setStyle(ButtonStyle.Primary).setLabel("Confirm Selection").setEmoji("✔")
      );

      interaction.update({ embeds: [embed], components: [buttons] });
   });
};
