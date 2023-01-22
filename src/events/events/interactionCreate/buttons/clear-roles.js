const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (client) => {
   client.on("interactionCreate", (interaction) => {
      if (interaction.customId !== "clear-roles") {
         return;
      }

      // The available roles in the select menu
      const selectMenu = interaction.message.components[0].components[0];
      const roles = selectMenu.data.options;

      // All of the user's roles
      const memberRoles = interaction.member.roles;

      let failedAttempt = false;
      for (const { value: roleId, label: roleName } of roles) {
         // Check what roles the user has from roles list in the select menu
         const hasRole = memberRoles.cache.get(roleId) ? true : false;

         if (hasRole) {
            // User has role so we can remove it
            memberRoles.remove(roleId).catch(() => (failedAttempt = true));
         }
      }

      const embed = new EmbedBuilder()
         .setAuthor({ name: `${interaction.member.user.username}'s roles`, iconURL: interaction.member.displayAvatarURL() })
         .setDescription(`Your roles have been successfully cleared!`)
         .setColor(interaction.message.embeds[0].data.color)
         .setTimestamp();

      interaction.reply({ embeds: [embed], ephemeral: true });
   });
};
