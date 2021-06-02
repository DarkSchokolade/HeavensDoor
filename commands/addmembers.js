const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const Authorized = require('../api/models/Authorized');
const Iot = require('../api/models/Iot');
module.exports.run = async (client, message, args) => {
  //RFID
  // console.log(args[0]); //RF_TAG
  let memberName = args[1];
  for (let i = 2; i < args.length; i++) {
    memberName += ' ' + args[i];
  }
  // console.log(memberName); //memberName
  // check IOT_ID existence

  let owner = await Authorized.findOne({ discordID: message.author.id });
  let update = {
    $push: {
      whiteList: {
        _id: args[0].toUpperCase(),
        memberName: memberName,
      },
    },
  };
  let options = { new: true };
  let addMember = await Authorized.findByIdAndUpdate(
    owner._id,
    update,
    options
  );
  if (addMember != null) {
    embed
      .setDescription(`${memberName} Member setup is completed!`)
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
    embed
      .setDescription(
        `${memberName} Member setup failed Failed!!,\nPlease Contact Support +91 1234567890!!`
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
      .setTitle('❌ Failed!');
  }
  message.channel.send(embed);
};
module.exports.help = {
  name: 'addmembers',
  desc: 'Add Family members',
  aliases: 'am',
};
