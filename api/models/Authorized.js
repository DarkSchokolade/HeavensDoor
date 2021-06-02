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
    recent: {
      granted: {
        key: {
          type: String,
          default: null,
        },
        timestamp: {
          type: String,
          default: null,
        },
      },
      intrusion: {
        key: {
          type: String,
          default: null,
        },
        timestamp: {
          type: String,
          default: null,
        },
      },
    },
  },
  { minimize: false }
);

module.exports = mongoose.model('Authorized', AuthorizedSchema);
