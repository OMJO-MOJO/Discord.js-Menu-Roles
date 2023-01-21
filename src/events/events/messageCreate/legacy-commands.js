module.exports = (client) => {
   client.on("messageCreate", async (message) => {
      const prefix = process.env.PREFIX;
      let commandName = message.content.split(" ")[0];

      if (!commandName.startsWith(prefix)) {
         // Command does not start with prefix
         return;
      }

      // Remove the prefix from the commands
      commandName = commandName.split("").splice(prefix.split("").length, commandName.length).join("").toLowerCase();

      const command = message.client.commands.get(commandName);

      if (!command) {
         return;
      }

      try {
         await command.execute(message);
      } catch (error) {
         console.error(error);
         await message.reply({ content: "There was an error while executing this command!" });
      }
   });
};
