const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const discord_id = require('./id')
require("dotenv").config();

const client = new Client({ intents: Object.values(GatewayIntentBits) });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on(Events.GuildMemberAdd, async member => {
	const { guild } = member;
	//Creadry鯖じゃなければ処理をここで切る
	if (guild.id !== discord_id.server) return;
	//メンバー数・ユーザー数・bot数を取得
	const members = await guild.members.fetch();
	const AllMember = guild.memberCount;
	const Users = members.filter(member => !member.user.bot).size;
	const Bots = members.filter(member => member.user.bot).size;
	//んで変更
	guild.channels.cache.get(discord_id.userChannels.All).setName(`AllMember: ${AllMember}`);
	guild.channels.cache.get(discord_id.userChannels.Usr).setName(`Users: ${Users}`);
	guild.channels.cache.get(discord_id.userChannels.Bot).setName(`Bots: ${Bots}`);
});

client.on(Events.GuildMemberRemove, async member => {
	const { guild } = member;
	if (guild.id !== discord_id.server) return;

	const members = await guild.members.fetch();
	const AllMember = guild.memberCount;
	const Users = members.filter(member => !member.user.bot).size;
	const Bots = members.filter(member => member.user.bot).size;

	guild.channels.cache.get(discord_id.userChannels.All).setName(`AllMember: ${AllMember}`);
	guild.channels.cache.get(discord_id.userChannels.Usr).setName(`Users: ${Users}`);
	guild.channels.cache.get(discord_id.userChannels.Bot).setName(`Bots: ${Bots}`);
});

client.login();

process.on('uncaughtException', console.error);
