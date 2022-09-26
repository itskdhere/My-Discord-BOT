// const defines -------------------------------------------
const api_token = process.env.API_TOKEN
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID

// Module Imports ------------------------------------------
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const axios = require('axios');
const http = require('http')

// Discord BOT Code ----------------------------------------
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
  console.log('Connected to Discord Gateway');
  client.user.setStatus('idle');
  client.user.setActivity('The Limitless Developer', { type: ActivityType.Watching });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login Client(BOT) ---------------------------------------
client.login(api_token).catch(console.log);

// Auto-Run 24/7 & Debug -----------------------------------
http.createServer((req, res) => res.end('BOT is Up & Running..!!')).listen(80)
client
    .on("debug", console.log)
    .on("warn", console.log)

setInterval(() => {
axios
  .get('https://discord.com/api/v9')
  .then(res => {
    console.log(`statusCode: ${res.status}`);
  })
  .catch(error => {
    console.log(error.response.data);
    console.log(error.response.status);
    if(error.response.status == 429) {
    exec('kill 1', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
    }
  });

}, 10000);


// Not Required Code
/*
client.on('ready', () => {
let status = [`idle`, `online`], i = 0;
setInterval(() => client.user.setStatus(`${status[i++ %  status.length]}`), 60000);
})
*/

/*

*/

/*

*/