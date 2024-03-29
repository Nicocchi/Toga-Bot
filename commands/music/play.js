const { Discord, Util } = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Play a song from YouTube
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  const serverQueue = client.queue.get(message.guild.id);

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel)
    return message.reply(`You need to be in a voice channel to play music`);

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT"))
    return message.channel.send(
      "I cannot to voice channel, please make " +
        "sure I have the proper permissions."
    );

  if (!permissions.has("SPEAK"))
    return message.channel.send(
      "I cannot to speak in this voice channel, " +
        "please make sure I have the proper permissions."
    );

  const searchString = args.join(" ");
  const url = args.join(" ");
  let waited = false;

  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    const playlist = await client.youtube.getPlaylist(url);
    const videos = await playlist.getVideos();

    for (const video of Object.values(videos)) {
      const video2 = await client.youtube.getVideoByID(video.id);
      await client.handleVideo(video2, message, voiceChannel, true);
    }

    return message.channel.send(
      `Playlist: **${playlist.title}** has been added to the queue!`
    );
  } else {
    try {
      var video = await client.youtube.getVideo(url);
      waited = true;
    } catch (e) {
      try {
        var videos = await client.youtube.searchVideos(searchString, 10);
        const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

        const response = await client.awaitReply(
          message,
          `
  __**Search Results:**__
  ${videos.map((song, i) => `[${++i}] **-** ${song.title}`).join("\n  ")}

  Please select a song
  `,
          10000
        );

        if (nums.includes(response)) {
          const index = parseInt(response, 10);

          var video = videos[index - 1];
          waited = true;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  if (waited) {
    return client.handleVideo(video, message, voiceChannel);
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["p"],
  permLevel: "User"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play a song from YouTube",
  usage: "play <song>"
};
