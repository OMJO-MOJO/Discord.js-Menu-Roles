const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder().setName("help").setDescription("Display all commands"),
   async execute(interaction) {
      let description = ``;
      for (const [commandName, commandObject] of interaction.client.commands) {
         console.log(commandObject);

         description += `• \`${process.env.prefix}${commandName}\` - ${commandObject.data.description}\n`;
      }

      const embed = new EmbedBuilder()
         .setTitle(`${interaction.client.user.username}'s Commands`)
         .setDescription(description)
         .setThumbnail(interaction.guild.iconURL())
         .setFooter({ text: process.env.message, iconURL: process.env.icon })
         .setColor(process.env.COLOR);

      interaction.reply({ embeds: [embed] });
   },
};
