const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const Authorized = require('../api/models/Authorized');
const Iot = require('../api/models/Iot');
module.exports.run = async (client, message, args) => {
  //RFID
  console.log(args[0]); //IOT_ID
  console.log(args[1]); //masterKeyCard
  // check IOT_ID existence
  let existence = await Iot.findOne({ IOT_ID: args[0] });
  // console.log(existence);

  if (existence != null && existence.status === 'Inactive') {
    // true proceed setup
    let data = {
      IOT_ID: existence.IOT_ID,
      discordID: message.author.id,
      masterKeyCard: args[1].toUpperCase(),
    };
    let newUser = await Authorized.create(data);
    // console.log(newUser);

    if (newUser != null) {
      let updates = {
        $set: { status: 'Activated', discordID: message.author.id },
      };
      let options = { new: true };
      let updateExistence = await Iot.findByIdAndUpdate(
        existence._id,
        updates,
        options
      );
      // console.log(updateExistence);
      // notify user
      embed
        .setDescription(`${args[1]} Device & masterKey setup is complete!`)
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
          `${args[1]} Device & masterKey setup Failed!!,\nPlease Contact Support +91 1234567890!`
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
  }
};
module.exports.help = {
  name: 'setup',
  desc: 'Setup Iot Device for first time',
  aliases: 's',
};
