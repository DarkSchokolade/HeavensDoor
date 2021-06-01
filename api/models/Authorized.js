const mongoose = require('mongoose');

const AuthorizedSchema = mongoose.Schema(
  {
    houseOwner: { type: String, required: true },
    discordID: { type: String, required: true },
    masterKeyCard: { type: String },
    whiteList: [{ RFID: { type: String } }],
  },
  { minimize: false }
);

module.exports = mongoose.model('Authorized', AuthorizedSchema);
