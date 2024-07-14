const { SlashCommandBuilder, channelMention, userMention, EmbedBuilder, Colors, PermissionsBitField, ChatInputCommandInteraction } = require('discord.js');
const utils = require("../../utils")


const calTasks = (user) => {
    let task = 0;
    user.roles.cache.forEach((value, _) => {
        switch (value.color) {
            case 3447003: task += 2; break;
            case 3066993: task += 1; break;
            case 15844367: task += 3; break;
            case 15105570: task += 4; break;
        }

    });
    return user;
}
module.exports = {
    data: new SlashCommandBuilder()
        //コマンド名前
        .setName('role')
        //コマンドの説明
        .setDescription('ロールに関するコマンド')
        .addSubcommand((subcommand) =>
            subcommand
                .setName("getdata")
                .setDescription("現在の仕事量を取得する")

                .addUserOption((option) => option
                    .setName('user')
                    .setDescription('取得するユーザー')
                    .setRequired(true),
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("more")
                .setDescription("仕事量が多すぎを計算してくれる")

                .addNumberOption((option) => option
                    .setName('more_role')
                    .setDescription('指定した数値より上の仕事量が"仕事量過多"ロールが付きます')
                    .setRequired(true),
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("less")
                .setDescription("仕事量が少なすぎを計算してくれる")

                .addNumberOption((option) => option
                    .setName('less_role')
                    .setDescription('指定した数値より下の仕事量が"仕事量過少"ロールが付きます')
                    .setRequired(true),
                )
        ),

    /**
     * インタラクションが作成されたときに呼ばれるイベントのリスナー関数
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'getdata') {
            await interaction.deferReply()
            const getuser = interaction.options.getUser("user")
            interaction.guild.members.fetch(getuser.id).then(user => {
                let color = "";
                const task = calTasks(user)
                const BaseURL = "https://cdn.discordapp.com/attachments/1193112697886224384/"
                if (task <= 2) {
                    userroletype = "BAD"
                    image = `${BaseURL}1226439287537664041/Frieren_matakenkasiteru_remove.png`
                    color = "00008b"
                } else if (task <= 5) {
                    userroletype = "GOOD"
                    image = `${BaseURL}1226438015878959164/good.png`
                    color = "00ff00"
                } else if (task <= 10) {
                    userroletype = "CAUTION"
                    image = `${BaseURL}1226433964273565798/CAUTION.jpg`
                    color = "ff8c00"
                } else if (task <= 15) {
                    userroletype = "WARNING"
                    image = `${BaseURL}1226433963082387557/warning.jpeg`
                    color = "dc143c"
                } else if (task <= 20) {
                    userroletype = "DANGER"
                    image = `${BaseURL}1226438866492457041/DANGER.png`
                    color = "800080"
                } else {
                    userroletype = "UNKNOWN"
                    image = `${BaseURL}1226439287537664041/Frieren_matakenkasiteru_remove.png`
                    color = "4b0082"
                }
                let roletext = "NO TASK ROLE"
                //仕事量過多なら
                if (user.roles.cache.has(utils.ID.TooManyTask)) {
                    roletext = "TASK MORE ROLE"
                    //仕事量過少なら
                } else if (user.roles.cache.has(utils.ID.TooLittleTask)) {
                    roletext = "TASK LESS ROLE"
                }
                interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `取得者: ${getuser.displayName}` })
                            .setTitle(`TASK LEVEL: ${userroletype}`)
                            .setDescription(`あなたのTASK量は: ${task} です。\nロール:${roletext}`)
                            .setImage(image)
                            .setColor(color)
                    ]
                });
            })

        } else if (interaction.options.getSubcommand() === 'more') {
            await interaction.deferReply();
            let more = interaction.options.getNumber("more_role");
            let highlist = [];

            const members = await interaction.guild.members.fetch();

            members.forEach((member) => {

                interaction.guild.members.fetch(member.id).then(user => {
                    const moretask = calTasks(user)
                    //OR MORE
                    if (moretask >= more && !member.roles.cache.has(utils.ID.SubAccountRole) && !member.roles.cache.has(utils.ID.BotRole)) {
                        highlist[highlist.length] = member.displayName;
                    }
                    //最高値が指定されているか
                    //↑ @manmen2414:setRequestedなので設定せざるを得ません
                    interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`TASK LEVEL ${more} OR MORE`)
                                .addFields([{ name: `${highlist}`, value: `TASK量${more}以上` }])
                                .setColor('00008b')
                        ]
                    });
                })
            })
        } else if (interaction.options.getSubcommand() === 'less') {
            let less = interaction.options.getNumber("less_role");
            let badlist = [];
            const members = await interaction.guild.members.fetch();
            await interaction.deferReply();
            members.forEach((member) => {
                interaction.guild.members.fetch(member.id).then(user => {
                    const task = calTasks(user)
                    //OR LESS
                    //もしタスク量が指定量に満たなかった場合、botロールかつさーぶあかロールを保持していない場合
                    if (task <= less && !member.roles.cache.has(utils.ID.SubAccountRole) && !member.roles.cache.has(utils.ID.BotRole)) {
                        badlist[badlist.length] = member.displayName;
                    }
                    //最低値が指定されているか
                    //↑ @manmen2414:setRequestedなので設定せ(ry
                    interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`TASK LEVEL ${less} OR LESS`)
                                .addFields([{ name: `${badlist}`, value: `TASK量${less}以下` }])
                                .setColor('8b0000')
                        ]
                    });
                })
            })
        }
    }
};