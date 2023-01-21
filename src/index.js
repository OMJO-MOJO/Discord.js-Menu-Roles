const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// Create a new Discord Client
const client = new Client({
   intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Register the events
const loadEvents = require("./events/load-events");
loadEvents(client);

// Login client to run the bot
client.login(process.env.TOKEN);
