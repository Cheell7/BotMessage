const { owner} = require('../../config/config.json');
const { error, dono } = require('../../config/colors.json');
const emojis = require('../../config/emojis.json');
const { Discord, MessageEmbed } = require('discord.js');

module.exports = {
  name: "serverlistall",
  aliases: ["slistall"],
  run: async (client, message, args, guild) => {
        message.delete(); 
        if(message.author.id === owner) {
        
        var dm = message.author

        client.guilds.cache.forEach((guild) => {
            let list = new MessageEmbed()
                .setColor(dono)
                .addField(emojis.discord + ' Guild', `${guild.name} (\`${guild.id}\`)`, false)
                .addField(emojis.crown + ' Owner', `${guild.owner.user.tag} (||${guild.owner.user.id}||)`, false)
                .addField(emojis.members + ' Members', `${guild.memberCount}`, false)
            dm.send(list);
        });
            let guildall = new MessageEmbed()
                .setColor(dono)
                .setDescription(`${emojis.data} **Guilds**: ${client.guilds.cache.size}`)
            dm.send(guildall)
        } else {
            let embedfiot = new MessageEmbed()
                .setColor(error)
                .setDescription(`${emojis.false} hey **${message.author.username}**, apenas o proprietário do bot pode utilizar este comando.`);
            return message.channel.send(embedfiot).then(m => m.delete({ timeout: 60000 * 2 }));
        }
    }
}