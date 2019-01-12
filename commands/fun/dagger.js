const Discord = require("discord.js");
//  Description: Give a stabby to someone
//  Usage: cucumber arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  if (!user) {
    var msg = `You got a :dagger: from yourself\n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ :dagger:`;
  } else {
    var msg = `${user.user}, you got a :dagger: from ${
      message.author.username
    }\n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ :dagger:`;
  }
  message.channel.send(msg);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "dagger",
  category: "Fun",
  description: "Give a dagger to someone",
  usage: "dagger <user>"
};
