const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    //コマンド名前
		.setName('kill')
        //コマンドの説明
		.setDescription('...?')
        .addSubcommand((subcommand) =>
        subcommand
            .setName("yourself")
            .setDescription("...ふざけるな、私は500年以上生きた大魔族だ。")
        )
        .addSubcommand((subcommand) =>
        subcommand
            .setName("myself")
            .setDescription("???「自害しろ」")
        ),

        async execute(interaction) {
            if (interaction.options.getSubcommand() === 'yourself') {
		await interaction.reply('ありえない...この私が....');
        await interaction.editReply({ files: ['https://cdn.discordapp.com/attachments/1193112697886224384/1226447850095906849/aura_kill_yourself.jpg?ex=6624cd91&is=66125891&hm=caf22ee7e2a59b9af592898276388ee6a7064a7005731fc870be4abba879ac10&'] })
	} else if (interaction.options.getSubcommand() === 'myself') {
        if (interaction.member.roles.cache.has('1192986048213553213') || interaction.member.roles.cache.has('1192986404142207136') || interaction.member.roles.cache.has('1196278442153488485') || interaction.member.roles.cache.has('192986404142207136')) {
            await interaction.reply(`${interaction.member.displayName}、自害しろ`);
            const random = Math.floor(Math.random() * 7)
            switch (random) {
            case 0:await interaction.editReply(`${interaction.member.displayName}はどうやら首が硬くて自害できなかった!`); break;
            case 1:await interaction.editReply(`${interaction.member.displayName}はどうやら刀を持っていなかった!`); break;
            case 2:await interaction.editReply(`${interaction.member.displayName}はどうやらアウラではなかった!!`); break;
            case 3:await interaction.editReply(`${interaction.member.displayName}はどうやらゾルトラークによって消し飛ばされた!`); break;
            case 4:await interaction.editReply(`${interaction.member.displayName}は死んでしまった!`); break;
            case 5:await interaction.editReply(`${interaction.member.displayName}は自害する前にあっきーに食われた!`); break;
            case 6:await interaction.editReply(`${interaction.member.displayName}は自首した!`); break;
            }
        } else {
        await interaction.reply(`${interaction.member.displayName}、自害しろ`);
        await interaction.editReply({ files: ['https://cdn.discordapp.com/attachments/1193112697886224384/1226782801735585812/AuraKill_yourself.jpg?ex=66260584&is=66139084&hm=f38cc9fcc956b85af4ef2f8609ed2582a983bc7a9786b1cc3827ac9a4acdd1f4&'] })
        interaction.member.kick('自害してしまった！')
        }
    }
} 
};