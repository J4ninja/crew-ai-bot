const fs = require("node:fs");
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');
require('dotenv').config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;

const {Routes} = require('discord.js');
const { REST } = require('@discordjs/rest')

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]});

client.commands = getCommands("./commands");

client.once(Events.ClientReady, async (c) => {
    await registerCommands();
    console.log(`${c.user.tag} is online.`);
});

client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) {
        return;
    }

    let command = client.commands.get(interaction.commandName);

    try {
        if(interaction.replied) return;
        command.execute(interaction);
    } catch(error) {
        console.error(error);
    }
});

client.login(TOKEN);

function getCommands(dir) {
    let commands = new Collection();
    const commandFiles = getFiles(dir);

    for(const commandFile of commandFiles) {
        const command = require(commandFile);
        commands.set(command.data.toJSON().name, command);
    }

    return commands
}

function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let commandFiles = [];


    for (const file of files) {
        if(file.isDirectory()) {
            // recursive call getFiles to subdirs
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`)
            ];
        } 
        // pushes file to commandFiles array
        else if (file.name.endsWith(".js")) {
            commandFiles.push(`${dir}/${file.name}`);
        }
    }

    return commandFiles;
}


// Register commands
async function registerCommands() {
    let commands = [];
    const commandFiles = getFiles("./commands");

    for (const file of commandFiles) {
        const command = require(file);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "10" }).setToken(TOKEN);

    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log("Successfully deployed commands!");
    } catch (error) {
        console.error(error);
    }
}

