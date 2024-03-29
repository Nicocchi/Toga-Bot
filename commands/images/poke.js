const Discord = require("discord.js");
//  Description: Display the poke image.
//  Usage: poke arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/poke.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is poking thin air~~`;
      } else {
        var msg = `${message.author} is poking ${user.user}~~`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`POKE`, msg)
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
  name: "poke",
  category: "Image",
  description: "Display the poke image",
  usage: "poke <user>"
};
