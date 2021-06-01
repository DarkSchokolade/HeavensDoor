const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const Iot = require('../api/models/Iot');
module.exports.run = async (client, message, args) => {
  //IOT Manufacturer side
  if (message.author.id != '311065733641797633')
    return message.channel.send('❌ UnAuthorized!');
  let data = {
    IOT_ID: args[0],
  };
  try {
    let existence = await Iot.findOne({ IOT_ID: args[0] });
    // console.log(existence);
    if (existence != null) {
      message.channel.send(`IOT Device Already Existing!`);
    } else {
      let result = await Iot.create(data);
      // console.log(result);
      if (result != null) {
        embed
          .setDescription(`${args[0]} Added to Iot Collection successfully.`)
          .setColor(
            `#${Math.floor((Math.random() * 0xffffff) << 0)
              .toString(16)
              .padStart(6, '0')}`
          )
          .setAuthor(
            `Hello ${message.author.username}!`,
            message.author.avatarURL({ dynamic: true })
          )
          .setTitle('✅ Success!');
      } else {
        embed.setDescription(`Failed added to Iot Collection.`);
        embed
          .setColor(
            `#${Math.floor((Math.random() * 0xffffff) << 0)
              .toString(16)
              .padStart(6, '0')}`
          )
          .setAuthor(
            `Hello ${message.author.username}!`,
            message.author.avatarURL({ dynamic: true })
          )
          .setTitle('❌ Failure!');
      }
      message.channel.send(embed);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.help = {
  name: 'addIot',
  desc: 'Add Owner MasterKey & Signup',
  aliases: 'a',
};
