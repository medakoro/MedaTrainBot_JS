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
            ),
	async execute(interaction) {
        const addreportchannel = interaction.options.getString("addreportchannel");    //IDには、「.setName」で指定した名前を指定
		await interaction.reply(`インシデント報告用チャンネルを作成しました。チャンネル名は: ${addreportchannel}です。カテゴリー:インシデントログで確認してください`);
        const channel = await interaction.guild.channels.create({
            name: addreportchannel,
            parent: '1195712382798930022',
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
	},
};
