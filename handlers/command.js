const { readdirSync } = require("fs");
const cor = require('colors');
const { Collector } = require("discord.js");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                console.log(cor.cyan('                             [CMD] ') + cor.white(`${pull.name.toUpperCase()}`) + cor.gray(': ') + cor.green('ATIVADO'));
            } else {
              console.log(cor.cyan('                             [CMD] ') + cor.white(`${file.toUpperCase()}`) + cor.gray(': ') + cor.red('DESATIVADO'));
                continue;
            }
            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(cor.cyan('                             [END] ') + cor.gray('Comandos carregados 100%') + '\n');
}