const { prefix, token} = require('../../config/config.json');
const { embed, error, aviso } = require('../../config/colors.json');
const emojis = require('../../config/emojis.json');
const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
    name: "aviso",
    aliases: ["avisos"],
    run: async (client, message, args) => {
        message.delete().catch(O_o => {});

        if(!message.member.permissions.has("ADMINISTRATOR", "MANAGE_MESSAGES")) {
            let perm = new MessageEmbed()
                .setColor(error)
                .setDescription(emojis.false + ` Hey ${message.author}, você não tem permissão para utilizar esse comando!`)
            return message.channel.send(perm).then(msg => msg.delete({ timeout: 20000 }))
        }

        let separacao = args.join(' ').split(' / ')
        let titulo = separacao[0]
        let descrição = separacao[1]

        if(!titulo){
            let errotitulo = new MessageEmbed()
                .setColor(error)
                .setDescription(
                    emojis.false + ' Comando inserido errado, tente usar este exemplo abaixo:\n\n' +
                    `${prefix}aviso Título / Descrição do seu texto aqui`
                )
            return message.channel.send(errotitulo).then(msg => msg.delete({ timeout: 20000 }))
        }

        if(!descrição){
            let errodescrição = new MessageEmbed()
                .setColor(error)
                .setDescription(
                    emojis.false + ' Comando inserido errado, tente usar este exemplo abaixo:\n\n' +
                    `${prefix}aviso Título / Descrição do seu texto aqui`
                )
            return message.channel.send(errodescrição).then(msg => msg.delete({ timeout: 20000 }))
        }

        let avisospronto = new MessageEmbed()
            .setColor(embed)
            .addField(`${titulo}`, `${descrição}`)
        return message.channel.send(avisospronto);
    }
}