const mongoose = require('mongoose');

const IotSchema = mongoose.Schema(
  {
    IOT_ID: { type: String, required: true },
    discordID: { type: String, default: 'UNREGISTERED' },
    status: { type: String, default: 'Inactive' },
  },
  { minimize: false }
);

module.exports = mongoose.model('Iot', IotSchema);
