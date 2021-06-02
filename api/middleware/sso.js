const Authorized = require('../models/Authorized');
const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const moment = require('moment');
const sso = (client) => {
  return async (req, res, next) => {
    // console.log(req.body.rf_tag);
    try {
      const result = await Authorized.findOne({ IOT_ID: req.body.IOT_ID });
      // console.log(result);
      if (result != null) {
        // check with MasterKeycard
        if (result.masterKeyCard === req.body.rf_tag) {
          let update = {
            $set: {
              'recent.granted': {
                key: req.body.rf_tag,
                timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
              },
            },
          };
          let options = { new: true };
          let grantedKeyUpdate = await Authorized.findByIdAndUpdate(
            result._id,
            update,
            options
          );
          // console.log(grantedKeyUpdate);
          return res.sendStatus(202);
        } else {
          const resultFilter = result.whiteList.filter(
            (member) => member._id === req.body.rf_tag
          );
          if (!resultFilter.length) {
            const user = client.users.cache.find(
              (user) => user.id == result.discordID
            );
            embed
              .setDescription(
                `Unauthorized key used to access Home RF_TAG: **${req.body.rf_tag.toUpperCase()}**\nAccess Denied! Heaven's Door stays closed!`
              )
              // #59BA1E
              .setColor(`#D22739`)
              .setTitle('⚠️Intrusion Alert!')
              .setFooter(
                `Timestamp: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
              );
            await user.send(embed);
            let update = {
              $set: {
                'recent.intrusion': {
                  key: req.body.rf_tag,
                  timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                },
              },
            };
            let options = { new: true };
            let intrusionKeyUpdate = await Authorized.findByIdAndUpdate(
              result._id,
              update,
              options
            );
            // console.log(intrusionKeyUpdate);
            res.sendStatus(401);
          } else {
            let update = {
              $set: {
                'recent.granted': {
                  key: req.body.rf_tag,
                  timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                },
              },
            };
            let options = { new: true };
            let grantedKeyUpdate = await Authorized.findByIdAndUpdate(
              result._id,
              update,
              options
            );
            // console.log(grantedKeyUpdate);
            res.sendStatus(202);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    next();
  };
};

module.exports = sso;
