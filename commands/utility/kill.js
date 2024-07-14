const { SlashCommandBuilder } = require('discord.js');
const utils = require("../../utils")

const MESSAGES = [
    "%sはどうやら首が硬くて自害できなかった!",
    "%sはどうやら刀を持っていなかった!",
    "%sはどうやらアウラではなかった!!",
    "%sはどうやらゾルトラークによって消し飛ばされた!",
    "%sは死んでしまった!",
    "%sは自害する前にあっきーに食われた!",
    "%sは自首した!"
]

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
            if (!utils.ID.IsHasNoPermisson(interaction, utils.ID)) {
                const random = Math.floor(Math.random() * MESSAGES.length)
                if (!MESSAGES[random])
                    await interaction.reply(`${interaction.member.displayName}は自害ルーレットで範囲外を出したので||証拠隠滅で||射殺されてしまった！`)
                else await interaction.reply(MESSAGES[random].replaceAll("%s", interaction.member.displayName))
            } else {
                await interaction.reply({ content: `${interaction.member.displayName}、自害しろ`, files: ['https://cdn.discordapp.com/attachments/1193112697886224384/1226782801735585812/AuraKill_yourself.jpg?ex=66260584&is=66139084&hm=f38cc9fcc956b85af4ef2f8609ed2582a983bc7a9786b1cc3827ac9a4acdd1f4&'] });
                interaction.member.kick('自害してしまった！')
            }
        }
    }
};