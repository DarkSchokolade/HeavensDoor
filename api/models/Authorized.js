const mongoose = require('mongoose');

const AuthorizedSchema = mongoose.Schema({
  houseOwner: { type: String, required: true },
  discordID: { type: String, required: true },
  masterKeyCard: { type: String, required: true, unique: true },
  whiteList: [{ RFID: { type: String } }],
});

module.exports = mongoose.model('Authorized', AuthorizedSchema);
