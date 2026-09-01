const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Bot online como ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.reply('Pong! A Z\'s Store está online 🚀');
    }
});

// O bot faz login usando a chave secreta guardada nas configurações do Render
client.login(process.env.DISCORD_TOKEN);
