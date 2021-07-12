const { prefix, token} = require('../../config/config.json');
const { embed, error, aviso } = require('../../config/colors.json');
const emojis = require('../../config/emojis.json');
const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    run: async (client, message, args, guild) => {
        message.delete().catch(O_o => {});

        if(!message.member.permissions.has("MANAGE_MESSAGES")) {
            let perm = new MessageEmbed()
                .setColor(error)
                .setDescription(emojis.false + ` Hey **${message.author.username}**, você não tem permissão para utilizar esse comando!`)
            return message.channel.send(perm).then(msg => msg.delete({ timeout: 20000 }))
        }

        if(!message.guild.me.permissions.has("ADMINISTRATOR", "MANAGE_MESSAGES", "MENTION_EVERYONE")){
            let embed = new MessageEmbed()
                .setDescription(emojis.false + ` Hey **${message.author.username}**, eu não tem permissão para utilizar esse comando!`)
                .setColor(error);
            return message.channel.send(embed).then(m => m.delete({ timeout: 20000 }));
        }

        let botmessage = args.join(" ");
        if(!botmessage) {
            let semargs = new MessageEmbed()
                .setColor(error)
                .setDescription(
                    emojis.false + ' Comando inserido errado, tente usar este exemplo abaixo:\n\n' +
                    `${prefix}embed Descrição do seu texto aqui`
                )
            return message.channel.send(semargs).then(msg => msg.delete({ timeout: 20000 }));
        }
        let embedFim = new MessageEmbed()
            .setColor(embed)
            .setDescription(botmessage)
        return message.channel.send(embedFim);
    }
}