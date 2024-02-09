const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('announceコマンド。詳細はCRW、コマンドを参照')
        .addSubcommand((subcommand) =>
            subcommand
                .setName("train_stop")
                .setDescription("鉄道状態アナウンス[運転停止情報]")
                .addStringOption((option) => option
                    .setName('stop_section')
                    .setDescription('💥停止区間')
                    .setRequired(true),
                )
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'train_stop') {
            const stop_section = interaction.options.getString("stop_section");

            await interaction.reply({
                embeds: [
                    {
                        title: '鉄道状態アナウンス[運転停止情報]を発表しました。',
                        description: '\n',
                        color: '9807270', 
                    }
                ]
            });
            
            await interaction.client.channels.cache.get('1195747894704209960').send({
                content: "📣鉄道状態アナウンスが発令されました",
                embeds: [
                    {
                        title: '鉄道状態アナウンス[運転停止情報]',
                        description: '\n',
                        fields: [{ name: '[Description]:', value: stop_section }],
                        color: '15548997', 
                    }
                ]
            });
        }
    }
};
