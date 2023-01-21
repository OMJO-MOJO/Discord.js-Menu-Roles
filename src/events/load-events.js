const fs = require("fs");
const path = require("path");

const getAllFiles = require("../util/get-all-files");

module.exports = async (client) => {
   const eventsPath = path.join(__dirname, "events");
   const eventFiles = getAllFiles(eventsPath);

   for (const file of eventFiles) {
      const event = require(file);

      await event(client);
   }
};
