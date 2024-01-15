const { SlashCommandBuilder } = require('discord.js');

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
        var addreportchannel = interaction.options.getString("addreportchannel");    //IDには、「.setName」で指定した名前を指定
		await interaction.reply(`インシデント報告用チャンネルを作成しました。チャンネル名は: ${addreportchannel}です。カテゴリー:インシデントログで確認してください`);
        await interaction. client.channels.cache.get('1195747894704209960').send('@medakoro0321  インシデントが発生しました。対応してください。')
        await interaction.guild.channels.create({
            name: addreportchannel,
            parent: '1195712382798930022',
        })
	},
};