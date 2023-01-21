const { Collection } = require("discord.js");

const loadCommands = require("../../commands/load-commands");
const registerEvents = require("../../util/register-events");

module.exports = (client) => {
   client.on("ready", () => {
      client.commands = new Collection();
      loadCommands(client);
      registerEvents(client);

      console.log(" > \x1b[36m%s\x1b[0m", `${client.user.username}\x1b[0m is online`);
   });
};
