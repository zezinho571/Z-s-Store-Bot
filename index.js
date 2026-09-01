const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const http = require('http');

// Servidor HTTP interno para manter o bot ativo no Render
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Z\'s Store Bot esta online!\n');
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor web interno rodando.');
});

// Inicialização do cliente do Discord com os intents necessários
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

// Comandos do Bot
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // 1. Comando: !liberarcomissao (Desenhos & Artes)
    if (message.content === '!liberarcomissao') {
        const embedComissao = new EmbedBuilder()
            .setColor('#FF69B4')
            .setTitle('🎨 Z\'S STORE - DESENHOS & ARTES')
            .setDescription('Desenhos e artes personalizadas! Preços ajustados de acordo com sua preferência no Discord.')
            .addFields(
                { name: '🖼️ Opções Disponíveis', value: '• **Icon Personalizado:** Foto de perfil / Avatar.\n• **Desenho A4:** Arte detalhada no formato A4.\n• **Banner para Canal/Social:** Banner estilizado com tema.\n• **Outros Desenhos:** Projetos sob medida (a combinar).' },
                { name: '💳 Método de Pagamento', value: '• Exclusivamente via **PIX** para agilizar o início do projeto.' }
            )
            .setTimestamp()
            .setFooter({ text: 'Z\'s Store • Todos os direitos reservados' });

        const rowComissao = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('comprar_icon').setLabel('Icon (R$ 9,98)').setStyle(ButtonStyle.Primary).setEmoji('👤'),
            new ButtonBuilder().setCustomId('comprar_a4').setLabel('Desenho A4 (R$ 42,99)').setStyle(ButtonStyle.Primary).setEmoji('📄'),
            new ButtonBuilder().setCustomId('comprar_banner').setLabel('Banner (R$ 35,00)').setStyle(ButtonStyle.Primary).setEmoji('🚩'),
            new ButtonBuilder().setCustomId('comprar_outros').setLabel('Outros (A Combinar)').setStyle(ButtonStyle.Secondary).setEmoji('🎨')
        );

        return message.reply({ embeds: [embedComissao], components: [rowComissao] });
    }

    // 2. Comando: !liberarassinaturas (Em Desenvolvimento)
    if (message.content === '!liberarassinaturas') {
        const embedAssinatura = new EmbedBuilder()
            .setColor('#9370DB')
            .setTitle('✍️ Z\'S STORE - ASSINATURAS')
            .setDescription('🛠️ **Esta seção está atualmente em desenvolvimento.**\n\nEm breve teremos novidades para assinaturas! Fique de olho.')
            .setTimestamp()
            .setFooter({ text: 'Z\'s Store • Todos os direitos reservados' });

        return message.reply({ embeds: [embedAssinatura] });
    }

    // 3. Comando: !liberargamepass (Jujutsu Shenanigans)
    if (message.content === '!liberargamepass') {
        const embedGamePass = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('⚡ Z\'S STORE - JUJUTSU SHENANIGANS')
            .setDescription('Garanta acessos antecipados, emotes, slots e vantagens exclusivas nos seus jogos favoritos de forma rápida e segura.')
            .addFields(
                { name: '📝 O que você está comprando', value: 'Gamepasses, Emotes e cosméticos para Jujutsu Shenanigans.' },
                { name: '💳 Método de Pagamento', value: '• **PIX** (Envio imediato após envio do comprovante) ⚡' }
            )
            .setTimestamp()
            .setFooter({ text: 'Z\'s Store • Todos os direitos reservados' });

        // Linha 1 de botões (5 itens)
        const rowGamePass1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('comprar_emotes').setLabel('Emotes (R$ 2,50)').setStyle(ButtonStyle.Primary).setEmoji('🛒'),
            new ButtonBuilder().setCustomId('comprar_victory').setLabel('Victory Flashes (R$ 6,90)').setStyle(ButtonStyle.Primary).setEmoji('⚡'),
            new ButtonBuilder().setCustomId('comprar_early').setLabel('Early Access (R$ 18,90)').setStyle(ButtonStyle.Success).setEmoji('🚀'),
            new ButtonBuilder().setCustomId('comprar_slots_emote').setLabel('Slots Emote (R$ 9,90)').setStyle(ButtonStyle.Primary).setEmoji('📦'),
            new ButtonBuilder().setCustomId('comprar_slots_const').setLabel('Slots Const. (R$ 8,50)').setStyle(ButtonStyle.Primary).setEmoji('🔨')
        );

        // Linha 2 de botões (3 itens restantes)
        const rowGamePass2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('comprar_killsound').setLabel('Kill Sound (R$ 6,90)').setStyle(ButtonStyle.Secondary).setEmoji('🔊'),
            new ButtonBuilder().setCustomId('comprar_segunda_pag').setLabel('2ª Pág Emote (R$ 11,90)').setStyle(ButtonStyle.Secondary).setEmoji('📄'),
            new ButtonBuilder().setCustomId('comprar_skin').setLabel('Skin Awakening (R$ 6,90)').setStyle(ButtonStyle.Secondary).setEmoji('👕')
        );

        return message.reply({ embeds: [embedGamePass], components: [rowGamePass1, rowGamePass2] });
    }
});

// Trata todos os cliques nos botões da loja
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    let nomeProduto = '';
    let precoProduto = '';

    switch (interaction.customId) {
        // Desenhos & Artes
        case 'comprar_icon':
            nomeProduto = 'Icon Personalizado';
            precoProduto = 'R$ 9,98';
            break;
        case 'comprar_a4':
            nomeProduto = 'Desenho A4';
            precoProduto = 'R$ 42,99';
            break;
        case 'comprar_banner':
            nomeProduto = 'Banner para Canal/Social';
            precoProduto = 'R$ 35,00';
            break;
        case 'comprar_outros':
            nomeProduto = 'Outros Desenhos (Negociáveis)';
            precoProduto = 'A Combinar';
            break;

        // Jujutsu Shenanigans
        case 'comprar_emotes':
            nomeProduto = 'Emotes';
            precoProduto = 'R$ 2,50';
            break;
        case 'comprar_victory':
            nomeProduto = 'Victory Flashes';
            precoProduto = 'R$ 6,90';
            break;
        case 'comprar_early':
            nomeProduto = 'Early Access';
            precoProduto = 'R$ 18,90';
            break;
        case 'comprar_slots_emote':
            nomeProduto = 'Mais Slots para Emote';
            precoProduto = 'R$ 9,90';
            break;
        case 'comprar_slots_const':
            nomeProduto = 'Mais Slots de Construção';
            precoProduto = 'R$ 8,50';
            break;
        case 'comprar_killsound':
            nomeProduto = 'Custom Kill Sound';
            precoProduto = 'R$ 6,90';
            break;
        case 'comprar_segunda_pag':
            nomeProduto = 'Segunda Página de Emote';
            precoProduto = 'R$ 11,90';
            break;
        case 'comprar_skin':
            nomeProduto = 'Skin de Awakening';
            precoProduto = 'R$ 6,90';
            break;
        default:
            nomeProduto = 'Produto Indefinido';
            precoProduto = 'R$ 0,00';
    }

    const embedCarrinho = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🛒 Z\'s Store - Pedido Criado')
        .setDescription(`Você selecionou o produto: **${nomeProduto}** (${precoProduto})`)
        .addFields(
            { name: 'Status', value: 'Aguardando próximo passo...' },
            { name: 'Instruções', value: 'Abra um ticket ou chame um administrador para gerar o QR Code Pix e finalizar a compra.' }
        )
        .setTimestamp();

    await interaction.reply({ embeds: [embedCarrinho], ephemeral: true });
});

// Login do Bot
client.login(process.env.DISCORD_TOKEN);
