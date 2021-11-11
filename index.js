const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('wio.db')


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};


client.on("guildMemberRemove", async member => {
const cdb = require("croxydb")
      const profil = cdb.get("sayaç." + member.guild.id);
      if (profil) {
        let sayaçkanalID = profil.kanal;
        let sayaçsayı = profil.sayi;
        let sayaçkanal = client.channels.cache.get(sayaçkanalID);
        let aralık =
          parseInt(sayaçsayı) - parseInt(member.guild.members.cache.size);

        const ee = new Discord.MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setThumbnail(member.user.avatarURL())
          .setFooter(member.user.tag)
          .setDescription(
            `**\`${member.user.tag}\` Sunucudan Ayrıldı\n\nHedeflenen Üye Sayısı \`${sayaçsayı}\` \nHedefe Ulaşmamıza \`${aralık}\` Kişi Kaldı!\nSunucuda Şuan \`${member.guild.members.cache.size}\` Üye Var!**`
          );
        sayaçkanal.send(ee);
      }

});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});



client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

///////////////////////eklendim atıldım

client.on('guildDelete', guild => {

    let Crewembed = new Discord.MessageEmbed()

    .setColor("RED")
    .setTitle(" ATILDIM !")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

       client.channels.cache.get('784906432419069962').send(Crewembed);

    });


    client.on('guildCreate', guild => {

    let Crewembed = new Discord.MessageEmbed()

    .setColor("GREEN")
    .setTitle("EKLENDİM !")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

       client.channels.cache.get('784906432419069962').send(Crewembed);

    });

    client.on('message', msg => {
      if (msg.content.toLowerCase() === 'sa') {
        msg.reply('**Aleyküm Selam Hoşgeldin**');
      }

    });


    client.on("guildMemberAdd", async member => {
    if(member.user.bot) return;
    member.guild.channels.cache.get("897888854575562782").send(`${member}, 「ღ İsimli Kullanıcı Aramıza Katıldı  ${member.guild.memberCount}  Kişi Olduk ღ」`)
    });



client.login(ayarlar.token);

client.on('message', async msg => {
  if(msg.content == `<@897790509270044722>`) return msg.channel.send(`> **değistir | Prefix**\n\n>    **Sanırım beni etiketlediniz.**\n >  Buyurun prefixim \`${prefix}\``);
});


client.on("ready", () => {
client.channels.cache.get('878600696679780392').join();
});
