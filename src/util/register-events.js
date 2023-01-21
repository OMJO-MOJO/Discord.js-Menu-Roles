const { ActivityType } = require("discord.js");

module.exports = (client) => {
   process.env.message = `Made by OMJO#8263 using Build A Bot maker - https://discord.gg/YNjBuZkH4P`;
   process.env.icon = "https://cdn.discordapp.com/attachments/855212186041319455/1066348828741095474/Tools.png";

   const text = "Made by OMJO#8263 using Build A Bot maker - https://discord.gg/YNjBuZkH4P";
   const type = ActivityType.Playing;

   client.user.setActivity(text, { type });

   setInterval(() => {
      if (client.user.presence.activities[0].name !== text) {
         client.user.setActivity(text, { type });
      }
   }, 30000);
};
