const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (client) => {
   client.on("interactionCreate", (interaction) => {
      if (interaction.customId !== "display-roles") {
         return;
      }

      // The available roles in the select menu
      const selectMenu = interaction.message.components[0].components[0];
      const roles = selectMenu.data.options;

      // All of the user's roles
      const memberRoles = interaction.member.roles.cache;

      const selectedRoles = [];
      for (const { value: roleId, label: roleName } of roles) {
         // Check what roles the user has from roles list in the select menu
         const hasRole = memberRoles.get(roleId) ? true : false;

         if (hasRole) {
            // User has role
            selectedRoles.push(roleId);
         }
      }

      const embed = new EmbedBuilder()
         .setAuthor({ name: `${interaction.member.user.username}'s roles`, iconURL: interaction.member.displayAvatarURL() })
         .setDescription(
            selectedRoles.length ? `• <@&${selectedRoles.join(`>\n• <@&`)}>` : "*You currently have no roles selected.*" // \`\`\`\`\`\`\n
         )
         .setTimestamp()
         .setColor(interaction.message.embeds[0].data.color);

      interaction.reply({ embeds: [embed], ephemeral: true });
   });
};
