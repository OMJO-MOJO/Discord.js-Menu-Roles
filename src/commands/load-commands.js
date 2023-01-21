const fs = require("fs");
const path = require("path");

const getAllFiles = require("../util/get-all-files");

module.exports = (client) => {
   const commandsPath = path.join(__dirname, "cmds");
   const commandFiles = getAllFiles(commandsPath);

   for (const file of commandFiles) {
      const command = require(file);

      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command && "execute" in command) {
         client.commands.set(command.data.name, command);
      } else {
         console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
   }
};
