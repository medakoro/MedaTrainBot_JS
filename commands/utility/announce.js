const { SlashCommandBuilder, EmbedBuilder, Colors, ChatInputCommandInteraction } = require('discord.js');
const discord_id = require('../../id')

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
                .addStringOption((option) => option
                    .setName('stop_reason')
                    .setDescription('🧨原因')
                    .setRequired(true),
                )
                .addStringOption((option) => option
                    .setName('stop_repire')
                    .setDescription('🔨予想修理時間')
                    .setRequired(true),
                )
                .addStringOption((option) => option
                    .setName('stop_damage')
                    .setDescription('🚋この影響での人的/物的被害')
                    .setRequired(true),
                )
                .addUserOption((option) => option
                    .setName('stop_discoverer')
                    .setDescription('発見者')
                    .setRequired(true),
                )
        ),
    /**
 * インタラクションが作成されたときに呼ばれるイベントのリスナー関数
 * @param {ChatInputCommandInteraction} interaction
 */
    async execute(interaction) {
        if (discord_id.IfPermissonGet(interaction)) {
            await interaction.reply({ content: `貴方は実行権限を持ち合わせていません。\nご不明な点があれば\`/report crwdia\`でお問い合わせください。`, ephemeral: true });
        } else
            if (interaction.options.getSubcommand() === 'train_stop') {

                const stop_section = interaction.options.getString("stop_section");
                const stop_reason = interaction.options.getString("stop_reason");
                const stop_repire = interaction.options.getString("stop_repire");
                const stop_damage = interaction.options.getString("stop_damage");
                const stop_discoverer = interaction.options.getMember("stop_discoverer");

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('鉄道状態アナウンス[運転停止情報]を発表しました。')
                            .setColor(Colors.Grey)
                    ]
                });
                await interaction.client.channels.cache.get(discord_id.log).send({
                    content: "📣鉄道状態アナウンスが発令されました",
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `通達者: ${interaction.member.displayName}` })
                            .setTitle('鉄道状態アナウンス[運転停止情報]')
                            .setFields([
                                { name: '💥停止区間:', value: stop_section, inline: false },
                                { name: '🧨原因:', value: stop_reason, inline: false },
                                { name: '🔨予想修理時間:', value: stop_repire, inline: false },
                                { name: '🚋この影響での人的/物的被害:', value: stop_damage, inline: false }
                            ])
                            .setColor(Colors.Red)
                            .setFooter({ text: `発見者: ${stop_discoverer.displayName}` })
                    ]
                });
            }
    }
};
