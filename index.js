const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

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

// Exemplo de comando para gerar assinatura/pagamento
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // Comando !comprar <produto>
    if (message.content.startsWith('!comprar')) {
        const args = message.content.split(' ');
        const produto = args[1] || 'Assinatura Padrão';

        // Aqui você integrará a chamada à API do Mercado Pago futuramente
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
