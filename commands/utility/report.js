const { SlashCommandBuilder, channelMention, userMention, EmbedBuilder, Colors, PermissionsBitField, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        //コマンド名前
        .setName('trainreport')
        //コマンドの説明
        .setDescription('Reportコマンド。詳細はCRW鯖、コマンドを参照')
        .addSubcommand((subcommand) =>
            subcommand
                .setName("add")
                .setDescription("新しくインシデント報告チャンネルを作成する")

                .addStringOption((option) => option
                    .setName('addreportchannel')
                    .setDescription('インシデント報告名')
                    .setRequired(true),
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("closed")
                .setDescription("インシデント報告チャンネルを閉じる")
        ),
    /**
     * インタラクションが作成されたときに呼ばれるイベントのリスナー関数
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'add') {

            const addreportchannel = interaction.options.getString("addreportchannel");    //IDには、「.setName」で指定した名前を指定
            const channel = await interaction.guild.channels.create({
                name: addreportchannel,
                parent: '1195712382798930022',
                permissionOverwrites: [
                    {
                        id: '1192783677386674256',
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: '1193112813518995538',
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    }
                ]
            });
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('インシデント報告用チャンネルを作成しました。')
                        .setDescription('カテゴリー:インシデントログで確認してください')
                        .addFields(
                            { name: 'チャンネル名:', value: channelMention(channel.id) }
                        )
                        .setColor(Colors.Red)
                ]
            });
            await interaction.client.channels.cache.get('1195747894704209960').send({
                content: userMention('1074320635855126538'),
                embeds: [
                    new EmbedBuilder()
                        .setTitle('インシデントが発生しました。')
                        .setDescription('対応してください。')
                        .addFields(
                            { name: 'インシデント報告名:', value: channelMention(channel.id) }
                        )
                        .setColor(Colors.Blue)
                ]
            });
        } else if (interaction.options.getSubcommand() === 'closed') {
            if (interaction.channel.parentId !== '1195712382798930022') {
                await interaction.reply(`インシデントログでのみ実行可能です。`);
            } else
                if (!interaction.member.roles.cache.has('1195719181656662148') && !interaction.member.roles.cache.has('1196278442153488485') && !interaction.member.roles.cache.has('1192986048213553213')) {
                    await interaction.reply({ content: `エラー!:どうやらロール権限が足りないようです....もう一度ロールを確認して実行してください!`, ephemeral: true });
                }
                else {
                    await interaction.reply(`このチャンネルを閉じます・・・`);
                    await interaction.client.channels.cache.get('1195747894704209960').send({
                        content: userMention('1074320635855126538'),
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('解決済み。')
                                .addFields(
                                    { name: 'インシデント報告名:', value: interaction.channel.name }
                                )
                                .setColor(Colors.Blue)
                        ]
                    });

                    setTimeout(async () => {
                        await interaction.channel.delete();
                    }, 3e3);
                }
        }
    },
};
