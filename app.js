const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './api/config/config.env' });
const morgan = require('morgan');
const connectDB = require('./api/config/db');
const fs = require('fs');
const prefix = require('./prefix.json');
const PREFIX = prefix.PREFIX;
const app = express();
connectDB();
const {
  Client,
  MessageEmbed,
  WebSocketManager,
  Collection,
} = require('discord.js');
const client = new Client();
client.commands = new Collection();

const Commands = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of Commands) {
  const commandList = require(`./commands/${file}`);
  client.commands.set(commandList.help.name, commandList);
  client.commands.set(commandList.help.aliases, commandList);
}
console.log(Commands.length + ' files loaded in [ commands ] folder');

client.on('ready', () => {
  // client.user.setActivity('Pokemon Play', { type: 'Playing' });
  console.log(`${client.user.tag} has Powered Up!!!`);
});

// Commands folder access.
client.on('message', (message) => {
  if (message.author.bot) {
    return;
  }

  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (
    message.content.startsWith(PREFIX) ||
    message.content.startsWith(PREFIX.toUpperCase())
  ) {
    CommandHandler();
  }

  function CommandHandler() {
    let commandfile_1 = client.commands.get(cmd.slice(PREFIX.length));
    if (commandfile_1) {
      commandfile_1.run(client, message, args, messageArray);
    }
  }
});

client.login(process.env['BOT_TOKEN']);

// Logs information about all the requests.
if (process.env.NODE_ENV === 'development') {
  // Middleware used to log requests.
  app.use(morgan('dev'));
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.status('200').send({ status: 'active' });
});
app.use('/sso', require('./api/routes/sso'));

const PORT = process.env.PORT || 4000;
const SERVER_IP = process.env.SERVER_IP || 'localhost';

app.listen(
  PORT,
  SERVER_IP,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} of ${SERVER_IP}`
  )
);
