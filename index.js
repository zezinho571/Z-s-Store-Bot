const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Z\'s Store Bot esta online!\n');
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor web interno rodando.');
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Bot online e pronto para a Z's Store: ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('!comprar')) {
        const args = message.content.split(' ');
        const produto = args[1] || 'Assinatura Padrão';

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('🛒 Z\'s Store - Pedido Criado')
            .setDescription(`Você solicitou o produto: **${produto}**`)
            .addFields(
                { name: 'Status', value: 'Aguardando pagamento Pix...' },
                { name: 'Instruções', value: 'O QR Code e o código Pix serão gerados em breve.' }
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
});

client.login(process.env.DISCORD_TOKEN);
