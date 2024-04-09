const { SlashCommandBuilder, channelMention, userMention, EmbedBuilder, Colors, PermissionsBitField, ChatInputCommandInteraction } = require('discord.js');
const discord_id = require('../../id')

module.exports = {
    data: new SlashCommandBuilder()
        //コマンド名前
        .setName('trainreport')
        //コマンドの説明
        .setDescription('Reportコマンド。詳細はWoodry鉄道鯖、コマンドを参照')
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
                //カテゴリー指定
                parent: discord_id.reportParent,
                permissionOverwrites: [
                    /*{
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
                    }debug - deleted*/
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
            await interaction.client.channels.cache.get(discord_id.log).send({
                //debug 1074320635855126538
                content: userMention(discord_id.reportMember),
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
            if (interaction.channel.parentId !== discord_id.reportParent) {
                await interaction.reply(`インシデントログでのみ実行可能です。`);
            } else
                if (discord_id.IfPermissonGet(interaction)) {
                    await interaction.reply({ content: `貴方は実行権限を持ち合わせていません。\nご不明な点があれば\`/report crwdia\`でお問い合わせください。`, ephemeral: true });
                }
                else {
                    await interaction.reply(`このチャンネルを閉じます・・・`);
                    await interaction.client.channels.cache.get(discord_id.log).send({
                        content: userMention(discord_id.reportMember),
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