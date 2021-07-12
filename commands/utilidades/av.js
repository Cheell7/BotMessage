const Discord = require("discord.js");
const { embed } = require('../../config/colors.json');

module.exports = {
  name: "avatar",
  aliases: ["av", "icon", "ava"],
  run: async (cliet, message, args, guild) => {
        const taggedUser = message.mentions.users.first() || message.author;
        let avatarEmbed = new Discord.MessageEmbed()
            .setColor(embed)
	        .setAuthor(`Avatar de ${taggedUser.username}`)
            .setDescription(`[Download avatar](${taggedUser.displayAvatarURL({ dynamic: true })})`)
            .setImage(taggedUser.avatarURL({ format: "png", dynamic: true, size: 1024 }))
            .setFooter(`Author: ${message.author.tag}` , `${message.author.avatarURL()}`);
        message.channel.send(avatarEmbed);
    }
}