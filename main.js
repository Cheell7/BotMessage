const { Discord, Client, Collection, MessageEmbed } = require('discord.js');
const { prefix, token, owner, cmdUsing } = require('./config/config.json');
const { embed, error, aviso, logs } = require('./config/colors.json');
const { MessageCollector } = require("discord.js-collector");
const emojis = require('./config/emojis.json');
const cor = require('colors');
const moment = require('moment');
moment.locale('pt-br');
const client = new Client();

const fs = require("fs");
const art = fs.readFileSync('./config/logo.txt').toString("utf-8");

console.log(cor.cyan(art + '\n'));
console.log(cor.gray('                                           Developed by ') + cor.cyan('Chel') + '\n');

client.on('ready', async() => {
    console.log(cor.cyan('                             [Account] ' + cor.brightWhite(`${client.user.username} `) + cor.gray(`[${client.user.id}]`)));
    console.log(cor.cyan('                               [Account created] ') + cor.brightWhite(`Quase ${moment(client.user.createdAt).startOf('day').fromNow()}`));
    console.log(cor.cyan('                                 [Prefix] ') + cor.brightWhite(prefix));
    console.log(cor.cyan('                                   [Guilds] ') + cor.brightWhite(`${client.guilds.cache.size}`) + '\n');

    // STATUS DE ONLINE/OFFLINE
    client.user.setStatus('idle').catch(console.error) // online, idle, dnd, invisible;
  
    // STATUS DE ATIVIDADE DO BOT
    let activities = [
      `${prefix}help`,
      `Developed by ${client.users.cache.get(owner).username}`
    ],
    i = 0;
  
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
      type: 'PLAYING',
    }), 10000); // WATCHING, LISTENING, PLAYING AND STREAMING.
});

client.commands = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('message', async (message) => {
    if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@$client.user.id>`)){
        return message.reply({
            embed: new MessageEmbed()
            .setColor(embed)
            .setDescription(`Olá **${message.author.username}**, utilize \`${prefix}help\` caso esteja precisando de alguma ajuda. ` + emojis.verificado)
        }).then(m => m.delete({ timeout: 40000 }));
    };
	if(message.author.bot) return;
	if(!message.guild) return;
	if(!message.content.startsWith(prefix)) return;
	if(!message.member)
    message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if(cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	if(command) command.run(client, message, args);

    console.log(cor.cyan('[USING] ') + cor.brightCyan(cmd) + cor.gray(', comando usado por: ') + cor.brightCyan(`${message.author.tag}`) + cor.gray(` [${message.author.id}], `) + cor.gray('servidor: ') + cor.brightCyan(`${message.guild.name} `) + cor.gray(`[${message.guild.id}]`));

    let embedcmd = new MessageEmbed()
        .setColor(logs)
        .addFields(
            { name: `${emojis.user} User`, value: `${message.author.tag} (\`${message.author.id}\`)` },
            { name: `${emojis.discord} Guild`, value: `${message.guild.name} (\`${message.guild.id}\`)` },
            { name: `${emojis.settings} Command`, value: cmd },
        )
        .setTimestamp()
        .setFooter(`Members: ${message.guild.memberCount}`);
    client.channels.cache.get(cmdUsing).send(embedcmd);

    let embedcmd2 = new MessageEmbed()
        .setColor(logs)
        .setDescription(args)
        //.setFooter(message.author.username + ` (${message.author.id})`)
    client.channels.cache.get(cmdUsing).send(embedcmd2)
    .catch(err => {
        let embederror = new MessageEmbed()
            .setColor(error)
            .setDescription(`${emojis.false} Após o comando não foi definido nenhum argumento.`)
        client.channels.cache.get(cmdUsing).send(embederror)
        console.log(cor.red('[ERRO] ') + cor.gray('Após o comando não foi definido nenhum argumento.'))
    });

    /*
    let embedcmd3 = new MessageEmbed()
        .setColor(logs)
        .setDescription()
    client.channels.cache.get(cmdUsing).send(embedcmd3);
    */
});

client.login(token).catch(err => {
	console.log(cor.red('[ERROR]: ') +  cor.gray('Token inválida!'));
});