const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
module.exports.run = async (client, message, args) => {
  // console.log(args);
  if (message.author.bot) return;
  embed
    .setTitle(`🔒 Heaven's Door Security Solutions 🔒`)
    .setColor(0x4c8dcf)
    .setDescription(
      '**📜 Help Section:**\n**`xsetup XXX MASTERKEY` Quickly Setup replacing XXX -> IOT_ID & Added your MASTERKEY.\n\n`xaddmembers KEYCARD MEMBER_NAME` WhiteList KeyCard Members to Authorized.\n\n`xrecent granted` Recently granted details.\n\n`xrecent intrusion` Recently intrusion details.**'
    );
  message.channel.send(embed);
};
module.exports.help = {
  name: 'help',
  desc: `List of Commands used for Heaven's Door`,
  aliases: 'h',
};
