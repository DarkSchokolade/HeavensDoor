const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const Authorized = require('../api/models/Authorized');
module.exports.run = async (client, message, args) => {
  //RFID
  console.log(args[0]);
  console.log(message.author.username);
  console.log(message.author.id);

  let data = {
    houseOwner: message.author.username,
    discordID: message.author.id,
    masterKeyCard: args[0],
  };
  Authorized.create(data);
};
module.exports.help = {
  name: 'admin',
  desc: 'Add Owner MasterKey & Signup',
  aliases: 'a',
};
