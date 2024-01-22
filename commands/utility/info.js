const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');

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
            ),
	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'server') {
            interaction.guild.members.cache.filter(member => console.log(member.user.bot));
            await interaction.reply({ content: 'testmode.', ephemeral: true });
        //     await interaction.reply({ embeds: [
        //         new EmbedBuilder()
        //         .setTitle(interaction.guild.name)
        //         .setDescription('members.')
        //         .addFields(
        //             { name: 'AllMember:', value: `${interaction.guild.memberCount}`},
        //             { name: 'Users:', value: `${interaction.guild.members.cache.filter(member => !member.user.bot).size}`},
        //             { name: 'Bots:', value: `${interaction.guild.members.cache.filter(member => member.user.bot).size}`},
        //         )
        //         .setTimestamp(interaction.guild.createdAt)
        //         .setThumbnail(interaction.guild.iconURL())
        //         .setColor(Colors.Red)
        //     ]
        //   });
		} else if (interaction.options.getSubcommand() === 'user') {
            const member = interaction.options.getMember('member') || interaction.member;
            const Title = member.displayName;
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(Title)
                        .setTimestamp(member.joinedAt)
                        .setThumbnail(member.displayAvatarURL())
                        .setColor(Colors.Blue)
                    ]
                });
		}
	},
};
