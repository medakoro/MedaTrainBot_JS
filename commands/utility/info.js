const { SlashCommandBuilder, EmbedBuilder, Colors, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    //コマンド名前
		.setName('info')
        //コマンドの説明
		.setDescription('Provides information.')
            .addSubcommand((subcommand) =>
            subcommand
            .setName("server")
            .setDescription("Provides information about the server.")
            )
            .addSubcommand((subcommand) =>
            subcommand
            .setName("user")
            .setDescription("Provides information about the user.")
            .addUserOption((option) => 
            option
            .setName('member')
            .setDescription('select the target.')
            )
            )
            .addSubcommand((subcommand) => 
            subcommand
            .setName('bot')
            .setDescription('Provides interaction the tish bot.')
            ),
    /**
     * インタラクションが作成されたときに呼ばれるイベントのリスナー関数
     * @param {ChatInputCommandInteraction} interaction
     */
	async execute(interaction) {
        await interaction.reply({ content: 'Provides informations...' });
        if (interaction.options.getSubcommand() === 'server') {
            const members = await interaction.guild.members.fetch();
            await interaction.editReply({ 
                embeds: [
                    new EmbedBuilder()
                    .setTitle(interaction.guild.name)
                    .setDescription('members.')
                    .addFields(
                        { name: 'AllMember:', value: `${interaction.guild.memberCount}`},
                        { name: 'Users:', value: `${members.filter(member => !member.user.bot).size}`},
                        { name: 'Bots:', value: `${members.filter(member => member.user.bot).size}`}
                    )
                    .setTimestamp(interaction.guild.createdAt)
                    .setThumbnail(interaction.guild.iconURL())
                    .setColor(Colors.Red)
                ]
          });
		}
        if (interaction.options.getSubcommand() === 'user') {
            const member = interaction.options.getMember('member') || interaction.member;
            const Title = member.displayName;
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(Title)
                        .setTimestamp(member.joinedAt)
                        .setThumbnail(member.displayAvatarURL())
                        .setColor(Colors.Blue)
                    ]
                });
		}
        if (interaction.options.getSubcommand() === 'bot') {
            await interaction.editReply({ embeds: [
                new EmbedBuilder()
                .setTitle('Bot Information.')
                .setDescription(`/trainreport add addreportchannel:<インシデント報告名>
> インシデント報告名で問題が起きたことを知らせる
                
/trainreport closed 
> インシデント報告チャンネルを解決済みにする

/info server
> 鯖についての情報を出す

/info user member:<メンバー>
> メンバーについての情報を出す
> (なお、member:<メンバー>は任意)

/info bot
> 現在表示した情報です`)
            ] });
        }
	},
};
