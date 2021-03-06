const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], restTimeOffset: 50, messageCacheMaxSize: 50 });

const fs = require("fs");
const database = require('quick.db');
const moment = require('moment');
moment.locale('tr');//Beyefendi Code discord.gg/uSpaVjcDF9

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
if(err) console.error(err);
console.log(`${files.filter(a => a.endsWith('.js')).length} komut yüklenecek.`);
files.filter(a => a.endsWith('.js')).forEach(async f => {

let command = require(`./commands/${f}`);//Beyefendi Code discord.gg/uSpaVjcDF9
if(!command) return;

client.commands.set(command.help.name, command);
command.conf.aliases.forEach(alias => client.aliases.set(alias, command.help.name));
console.log(`${command.help.name} yüklendi.`);
});
});

client.elevation = message => {
if(!message.guild) return;
var permlvl = 0;
if(message.member.permissions.has("MANAGE_MESSAGES")) permlvl = 1;
if(message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
if(message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;//Beyefendi Code discord.gg/uSpaVjcDF9
return permlvl;
};

client.config = require('./ayarlar/ayarlar.js');
client.login(client.config.token);

client.on('ready', async () => {

require("./util/eventLoader")(client);
client.user.setStatus('online');
client.user.setActivity('s!help | s!yardım | discord.gg/uSpaVjcDF9', { type: 'LISTENING' })//Beyefendi Code discord.gg/uSpaVjcDF9

client.users.cache.forEach(x => {
  if(database.fetch(`k.${x.id}`)) {
    setTimeout(() => {
      database.delete(`k.${x.id}`)
      database.delete(`ik.${x.id}`);
    }, database.fetch(`k.${x.id}`)-Date.now());
  };
});

return console.log(`${client.user.tag} ismi ile giriş yaptım.`);//Beyefendi Code discord.gg/uSpaVjcDF9
});
