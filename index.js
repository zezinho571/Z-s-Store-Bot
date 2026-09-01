const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const http = require('http');

// Servidor web interno para o Render manter o bot vivo
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Z\'s Store Bot esta online!\n');
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor web interno rodando.');
});

// Inicializando o cliente do Discord com os intents necessários
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

    // 1. Painel de Comissões e Desenhos
    if (message.content === '!liberarcomissao') {
        const embedComissao = new EmbedBuilder()
            .setColor('#FF69B4')
            .setTitle('🎨 Z\'S STORE - COMISSÕES DE DESENHOS')
            .setDescription('Tenha uma arte exclusiva feita sob medida! Aqui você pode encomendar ilustrações personalizadas com alta qualidade.')
            .addFields(
                { name: '📝 O que você está comprando', value: '• **Desenho Personalizado:** Arte digital completa baseada na sua referência.\n• **Prazo de Entrega:** Combinado diretamente após a confirmação do pagamento.' },
                { name: '💳 Pagamento', value: '• Apenas via **PIX** para agilizar o início do projeto.' }
            )
            .setTimestamp();

        const rowComissao = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('comprar_desenho').setLabel('Comprar Desenho (R$ 20,00)').setStyle(ButtonStyle.Primary).setEmoji('🎨')
        );

        return message.reply({ embeds: [embedComissao], components: [rowComissao] });
    }

    // 2. Painel de Game Passes / Itens de Jogos
    if (message.content === '!liberargamepass') {
        const embedGamePass = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('⚡ Z\'S STORE - GAME PASSES & ITENS')
            .setDescription('Garanta seus acessos antecipados, emotes e vantagens exclusivas nos seus jogos favoritos de forma rápida e segura.')
            .addFields(
                { name: '📝 O que você está comprando', value: '• **Early Access / Game Pass:** Liberação de conteúdos restritos.\n• **Emotes e Slots:** Expansões e melhorias imediatas.' },
                { name: '⚡ Entrega', value: '• Envio ágil após a validação do Pix.' }
            )
            .setTimestamp();

        const rowGamePass = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('comprar_early').setLabel('Early Access (R$ 13,50)').setStyle(ButtonStyle.Success).setEmoji('🚀'),
            new ButtonBuilder().setCustomId('comprar_emotes').setLabel('Emotes (R$ 1,00)').setStyle(ButtonStyle.Primary).setEmoji('🛒')
        );

        return message.reply({ embeds: [embedGamePass], components: [rowGamePass] });
    }

    // 3. Painel de Assinaturas e Banners
    if (message.content === '!liberarassinaturas') {
        const embedAssinatura = new EmbedBuilder()
            .setColor('#9370DB')
            .setTitle('✍️ Z\'S STORE - ASSINATURAS & BANNERS')
            .setDescription('Deixe seu perfil ou servidor com um visual incrível utilizando nossos pacotes de banners e assinaturas personalizadas.')
            .addFields(
                { name: '📝 O que você está comprando', value: '• **Assinatura / Banner:** Elementos visuais estilizados para destaque.' },
                { name: '💎 Vantagens', value: '• Suporte dedicado e alta qualidade.' }
            )
            .setTimestamp();

        const rowAssinatura = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('comprar_assinatura').setLabel('Comprar Assinatura (R$ 10,00)').setStyle(ButtonStyle.Primary).setEmoji('✍️')
        );

        return message.reply({ embeds: [embedAssinatura], components: [rowAssinatura] });
    }
});

// Ouvinte para capturar os cliques nos botões de compra
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    let nomeProduto = '';
    if (interaction.customId === 'comprar_desenho') nomeProduto = 'Desenho Personalizado';
    if (interaction.customId === 'comprar_early') nomeProduto = 'Early Access';
    if (interaction.customId === 'comprar_emotes') nomeProduto = 'Emotes';
    if (interaction.customId === 'comprar_assinatura') nomeProduto = 'Assinatura / Banner';

    const embedCarrinho = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🛒 Z\'s Store - Pedido Criado')
        .setDescription(`Você solicitou o produto: **${nomeProduto}**`)
        .addFields(
            { name: 'Status', value: 'Aguardando pagamento Pix...' },
            { name: 'Instruções', value: 'O QR Code e o código Pix serão gerados em breve.' }
        )
        .setTimestamp();

    await interaction.reply({ embeds: [embedCarrinho], ephemeral: true });
});

// Login do bot utilizando a variável de ambiente do Render
client.login(process.env.DISCORD_TOKEN);
