const { prefix, owner} = require('../../config/config.json');
const { error, aviso, dono} = require('../../config/colors.json');
const emojis = require('../../config/emojis.json');
const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
  name: "serverleave",
  aliases: ["oleave", "sleave"],
  run: async (client, message, args, guild) => {
    message.delete(); 
    if(message.author.id === owner) {

    let servidor = args[0]
    if(!servidor){
      let embed = new MessageEmbed()
        .setColor(aviso)
        .setDescription(`${emojis.loading} Hey **${message.author.username}**, por favor digite o ID do servidor.`);
      return message.channel.send(embed).then(msg => msg.delete({ timeout: 20000 }));;
    }

    let guild = client.guilds.cache.find(guild => guild.id === servidor);
    if(!guild) {
      let embed = new MessageEmbed()
        .setColor(error)
        .setDescription(
          `${emojis.false} Hey **${message.author.username}**, por favor digite um ID válido! ${emojis.loading}\n\n` +
          '**Exemplo:**\n' +
          `${prefix}oleave 742085923998662747`
        )
      return message.channel.send(embed).then(msg => msg.delete({ timeout: 20000 }));;
    }
        
    let leave = new MessageEmbed()
      .setColor(aviso)
      .setDescription(`${emojis.loading} Hey **${message.author.username}**, Você realmente deseja me remover do servidor?\n`)
      .addField(`${emojis.discord} Guild`, `${guild.name} (\`${guild.id}\`)`)
      .addField(`${emojis.crown} Owner`, `${guild.owner.user.tag} (||${guild.owner.user.id}||)`)
      .addField(`${emojis.members} Members`, `${guild.memberCount}`)
    return message.channel.send(leave)
    .then(msg=> {
      msg.react('🟢').then(r => {
        msg.react('🔴')
        
        const sim = (reaction, user) => reaction.emoji.name === '🟢' && user.id === message.author.id;
        const nao = (reaction, user) => reaction.emoji.name === '🔴' && user.id === message.author.id;

        const siml = msg.createReactionCollector(sim, { time: 60000 });
        const naol = msg.createReactionCollector(nao, { time: 60000 });

        siml.on('collect', r=> {
          msg.delete();

          let remoção = new MessageEmbed()
            .setColor(dono)
            .setTitle(`${emojis.verificado} Remoção do servidor:\n`)
            .addField(`${emojis.discord} Guild`, `${guild.name} (\`${guild.id}\`)`)
            .addField(`${emojis.crown} Owner`, `${guild.owner.user.tag} (||${guild.owner.user.id}||)`)
            .addField(`${emojis.members} Members`, `${guild.memberCount}`)
            .addField(`${emojis.data} Guilds`, `${client.guilds.cache.size - 1}`)
            .setTimestamp()
          message.channel.send(remoção);
          guild.leave()
        });

        naol.on('collect', r=> {
          msg.delete();

          let cancelar = new MessageEmbed()
            .setColor(dono)
            .setDescription(`${emojis.verificado} Remoção cancelada do servidor: **${guild.name}** (\`${guild.id}\`)`)
          message.channel.send(cancelar);
        });
      });
    });
    } else {
      let embedfiot = new MessageEmbed()
        .setColor(error)
        .setDescription(`${emojis.false} hey **${message.author.username}**, apenas o proprietário do bot pode utilizar este comando.`);
      return message.channel.send(embedfiot).then(m => m.delete({ timeout: 60000 * 2 }));
    }
  },
}