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
            let userList = new Set();
            let botList = new Set();
            interaction.client.guilds.cache.forEach(guild => {
                guild.members.cache.filter(member => !member.user.bot).forEach(member => {
                  userList.add(member.user.id);
                });
            });
            interaction.client.guilds.cache.forEach(guild => {
                guild.members.cache.filter(member => member.user.bot).forEach(member => {
                  botList.add(member.user.id);
                });
            });
            await interaction.editReply({ embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `servers: ${(await interaction.client.guilds.fetch()).size}` })
                .setTitle('Bot Information.')
                .setDescription(`<@1195631607642591252> の使い方
                /kill yourself
                > ???「ありえない....この私が...」
                
                /info bot
                > botについて
                
                /info user member:<USER>
                > <USER>について
                
                /info server
                > この鯖について
                
                /mcid add addmcid:<STRING> crwmember:<USER>
                > <STRING>というMCIDを<USER>で登録する。なお、鉄道指令以上は他人も可能
                
                /mcid list
                > 現在登録されているMCIDを確認
                
                /role getdata user:<USER>
                > <USER>というユーザーのタスク量を計算
                
                /role less lessrole:<NUMBER>
                > <NUMBER>以下のTASK量を晒す
                
                /role more morerole:<NUMBER>
                > <NUMBER>以上のTASK量を晒す
                
                /trainreport add addreportchannel:<STRING>
                > <STRING>という名前でチャンネルを作成
                
                /trainreport closed
                > チャンネルを閉じる
                
                /announce ~~~
                > コマンド説明を見てね
                
                /ping test
                > おはよう`)
                .setFooter({ text: `all: ${userList.size + botList.size}, users: ${userList.size}, bots: ${botList.size}` })
                .setColor(Colors.Grey)
            ] });
        }
	},
};
