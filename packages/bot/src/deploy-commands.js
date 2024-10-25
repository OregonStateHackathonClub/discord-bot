import { REST, Routes } from 'discord.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config()

const commands = [];

const __dirname = dirname(fileURLToPath(import.meta.url));
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath);

for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(filePath);
    if ('data' in command.default && 'execute' in command.default) {
        commands.push(command.default.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
    console.error(error);
}