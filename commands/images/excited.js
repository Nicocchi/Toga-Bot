const Discord = require("discord.js");
//  Description: Display the excited image.
//  Usage: excited arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/excited.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is being excited!!`;
      } else {
        var msg = `${message.author} is excited from ${user.user}!!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`(ᗒᗨᗕ)`, msg)
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
  name: "excited",
  category: "Image",
  description: "Display the excited image",
  usage: "excited <user>"
};
