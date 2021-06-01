const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  memberName: {
    type: String,
  },
});

const AuthorizedSchema = mongoose.Schema(
  {
    IOT_ID: { type: String, required: true },
    discordID: { type: String, required: true },
    masterKeyCard: { type: String },
    whiteList: [memberSchema],
  },
  { minimize: false }
);

module.exports = mongoose.model('Authorized', AuthorizedSchema);
