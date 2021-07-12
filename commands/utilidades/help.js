const Discord = require('discord.js')
const { prefix, inviteServer, inviteURL } = require("../../config/config.json");
const { embed, error, aviso } = require('../../config/colors.json');

module.exports = {
    name: "help",
    aliases: ["ajuda", "comandos", "comando", "commandos", "command"],
    run: async (client, message, args, guild) => {
        message.channel.send(`Hey ${message.author}!`)
        const embedHelp = new Discord.MessageEmbed()
            .setColor(embed)
            .setDescription(
                `[<:add:835244890623442975> Me adicione](${inviteURL})\n` +
                `[<:suporte:835245516509544501> Suporte](${inviteServer})\n\n` +

                `**<:settingswhite:811429369473138708> Prefix:** ${prefix}\n\n` +
    
                '<:Box:804864088840077382> **Comandos**\n' +
                `\`mensagens\` \`aviso\` \`embed\` \`say\` \`av\``
            )
        return message.channel.send(embedHelp);
    }
}