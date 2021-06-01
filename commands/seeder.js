const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const Authorized = require('../api/models/Authorized');
const Iot = require('../api/models/Iot');
module.exports.run = async (client, message, args) => {};
module.exports.help = {
  name: 'seeder',
  desc: 'Setup Iot Device for first time',
  aliases: 'ss',
};
