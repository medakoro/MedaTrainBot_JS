const { SlashCommandBuilder, channelMention, userMention, EmbedBuilder, Colors } = require('discord.js');

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
	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'add') {
			
            const addreportchannel = interaction.options.getString("addreportchannel");    //IDには、「.setName」で指定した名前を指定
            const channel = await interaction.guild.channels.create({
                name: addreportchannel,
                parent: '1195712382798930022',
            });
            await interaction.reply({ embeds: [
                new EmbedBuilder()
                .setTitle('インシデント報告用チャンネルを作成しました。')
                .setDescription('カテゴリー:インシデントログで確認してください')
                .addFields(
                    { name: 'チャンネル名:', value: channelMention(channel.id)}
                )
                .setColor(Colors.Blue)
            ]
        });
            await interaction.client.channels.cache.get('1195747894704209960').send({
                content: userMention('1074320635855126538'),
                embeds: [
                    new EmbedBuilder()
                    .setTitle('インシデントが発生しました。')
                    .setDescription('対応してください。')
                    .addFields(
                        { name: 'インシデント報告名:', value: channelMention(channel.id)}
                    )
                    .setColor(Colors.Blue)
                ]
            });
		} else if (interaction.options.getSubcommand() === 'closed') {
            if (interaction.channel.parentId !== '1195712382798930022') {
                await interaction.reply(`インシデントログでのみ実行可能です。`);
            } else {
                await interaction.reply(`このチャンネルを閉じます・・・`);
                await interaction.client.channels.cache.get('1195747894704209960').send({
                    content: userMention('1074320635855126538'),
                    embeds: [
                        new EmbedBuilder()
                        .setTitle('解決済み。')
                        .addFields(
                            { name: 'インシデント報告名:', value: interaction.channel.name}
                        )
                        .setColor(Colors.Blue)
                    ]
                });
                await interaction.channel.delete();
            }
		}
	},
};
