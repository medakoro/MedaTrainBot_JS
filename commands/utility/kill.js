const { SlashCommandBuilder } = require('discord.js');
const discord_id = require("../../id")

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
            await interaction.reply({ content: "ありえない...この私が.... ", files: ['https://cdn.discordapp.com/attachments/1193112697886224384/1226447850095906849/aura_kill_yourself.jpg?ex=6624cd91&is=66125891&hm=caf22ee7e2a59b9af592898276388ee6a7064a7005731fc870be4abba879ac10&'] });
        } else if (interaction.options.getSubcommand() === 'myself') {
            if (!discord_id.IsHasNoPermisson(interaction)) {
                let messages = [
                    `${interaction.member.displayName}はどうやら首が硬くて自害できなかった!`,
                    `${interaction.member.displayName}はどうやら刀を持っていなかった!`,
                    `${interaction.member.displayName}はどうやらアウラではなかった!!`,
                    `${interaction.member.displayName}はどうやらゾルトラークによって消し飛ばされた!`,
                    `${interaction.member.displayName}は死んでしまった!`,
                    `${interaction.member.displayName}は自害する前にあっきーに食われた!`,
                    `${interaction.member.displayName}は自首した!`
                ]
                const random = Math.floor(Math.random() * messages.length)
                if (!messages[random])
                    await interaction.reply(`${interaction.member.displayName}は自害ルーレットで範囲外を出したので||証拠隠滅で||射殺されてしまった！`)
                else await interaction.reply(messages[random])
            } else {
                await interaction.reply({ content: `${interaction.member.displayName}、自害しろ`, files: ['https://cdn.discordapp.com/attachments/1193112697886224384/1226782801735585812/AuraKill_yourself.jpg?ex=66260584&is=66139084&hm=f38cc9fcc956b85af4ef2f8609ed2582a983bc7a9786b1cc3827ac9a4acdd1f4&'] });
                interaction.member.kick('自害してしまった！')
            }
        }
    }
};