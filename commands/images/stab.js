const Discord = require("discord.js");
//  Description: Display the stab image.
//  Usage: stab arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/stab.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is stabbing something!!`;
      } else {
        var msg = `${message.author} is stabbing ${user.user}!!!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`<(｀^´)>`, msg)
        .setColor("#FF4D9C")
        .setImage(res);

      message.channel.send({ embed: embed });
    })
    .catch(err => client.logger.log(err));
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stab",
  category: "Image",
  description: "Stab a user",
  usage: "stab <user>"
};
