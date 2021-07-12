const { prefix, token, cmdUsing} = require('../../config/config.json');
const { embed, error, aviso, logs } = require('../../config/colors.json');
const emojis = require('../../config/emojis.json');
const { Discord, MessageEmbed, MessageCollector } = require("discord.js");
const cor = require('colors');
let tempo = 20000;

module.exports = {
    name: "mensagens",
    aliases: ["embeds"],
    run: async (client, message, args, guild) => {
        message.delete().catch(O_o => {});

        if(!message.member.permissions.has("MANAGE_MESSAGES")) {
            let perm = new MessageEmbed()
                .setColor(error)
                .setDescription(emojis.false + ` Hey **${message.author.username}**, você não tem permissão para utilizar esse comando!`)
            return message.channel.send(perm).then(msg => msg.delete({ timeout: 20000 }))
        }

        if(!message.guild.me.permissions.has("ADMINISTRATOR", "MANAGE_MESSAGES", "MENTION_EVERYONE")){
            let permbot = new MessageEmbed()
                .setDescription(emojis.false + ` Hey **${message.author.username}**, eu não tem permissão para utilizar esse comando!`)
                .setColor(error);
            return message.channel.send(permbot).then(m => m.delete({ timeout: 20000 }));
        }

        let gomsg = new MessageEmbed()
            .setColor(aviso)
            .setDescription(`${emojis.chat} Defina uma mensagem.\n\n` + `${emojis.relogio} Tempo de espera: ${tempo / 1000}s`);
        message.channel.send(gomsg).then(m => m.delete({ timeout: 35000 }));
        
        let filter = message => !message.author.bot;
        const collector = message.channel.createMessageCollector(filter, { time: tempo });
        //const collector = new MessageCollector(message.channel, filter, { time: 15000 });

        collector.on('collect', message => {
            message.delete()
            const embedconfig = new MessageEmbed()
                .setColor(embed)
                .setDescription(message.content)
            message.channel.send(embedconfig);
            console.log(cor.cyan('Mensagem: ') + cor.gray(`${message.content}`));

            const EndMsg = new MessageEmbed()
                .setColor(logs)
                .setDescription(message.content)
                .setFooter(message.author.username + ` (${message.author.id})`)
            return client.channels.cache.get(cmdUsing).send(EndMsg);
        });
        
        collector.on('end', collected => {
            message.delete()
            const endmsg = new MessageEmbed()
                .setColor(aviso)
                .setDescription(`${emojis.relogio} Fim do tempo de espera`);
            message.channel.send(endmsg).then(m => m.delete({ timeout: 15000 }));
            console.log(cor.cyan('Total de mensagens: ') + cor.gray(`${collected.size}`));
        });
    }
}
