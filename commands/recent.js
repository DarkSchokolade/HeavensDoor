const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const errorEmbed = new MessageEmbed();
const Authorized = require('../api/models/Authorized');
module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  // Ping
  const result = await Authorized.findOne({ discordID: message.author.id });
  // console.log(result);
  if (result != null) {
    if (args[0] === 'granted') {
      embed
        .setDescription(
          `KeyCard: **${result.recent.granted.key}** was granted access recently!`
        )
        .setColor(
          `#${Math.floor((Math.random() * 0xffffff) << 0)
            .toString(16)
            .padStart(6, '0')}`
        )
        .setAuthor(
          `Hello ${message.author.username}!`,
          message.author.avatarURL({ dynamic: true })
        )
        .setFooter(`Timestamp: ${result.recent.granted.timestamp}`)
        .setTitle('Accessed Event Details');
    }

    if (args[0] === 'intrusion') {
      embed
        .setDescription(
          `KeyCard: **${result.recent.intrusion.key}** was recorded recently!`
        )
        .setColor(
          `#${Math.floor((Math.random() * 0xffffff) << 0)
            .toString(16)
            .padStart(6, '0')}`
        )
        .setAuthor(
          `Hello ${message.author.username}!`,
          message.author.avatarURL({ dynamic: true })
        )
        .setFooter(`Timestamp: ${result.recent.intrusion.timestamp}`)
        .setTitle('Intrusion Event Details');
    }

    message.channel.send(embed);
  } else {
    errorEmbed
      .setDescription(`User Not Authorized to checked records`)
      .setColor(
        `#${Math.floor((Math.random() * 0xffffff) << 0)
          .toString(16)
          .padStart(6, '0')}`
      )
      .setAuthor(
        `Hey ${message.author.username}!`,
        message.author.avatarURL({ dynamic: true })
      );
    message.channel.send(errorEmbed);
  }
};
module.exports.help = {
  name: 'recent',
  desc: 'Recent keyCard used',
  aliases: 'r',
};
