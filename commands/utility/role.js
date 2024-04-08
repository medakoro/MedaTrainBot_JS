const { SlashCommandBuilder, channelMention, userMention, EmbedBuilder, Colors, PermissionsBitField, ChatInputCommandInteraction } = require('discord.js');

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
            let getuser = interaction.options.getUser("user")
            await interaction.deferReply()
            interaction.guild.members.fetch(getuser.id).then(user => {
                let cache = user.roles.cache
                let task = 0;
                cache.forEach((value, key) => {
                    switch (value.color) {
                        case 3447003: task += 2; break;
                        case 3066993: task += 1; break;
                        case 15844367: task += 3; break;
                        case 15105570: task += 4; break;
                    }
    
                });
                if (task <= 2) {
                    userroletype = "BAD"
                    image = "https://cdn.discordapp.com/attachments/1193112697886224384/1226439287537664041/Frieren_matakenkasiteru_remove.png?ex=6624c598&is=66125098&hm=a2fa537daf559769324728992e89151075422b1570501bab2b15e2f2c5b76579&"
                    color = "00008b"
                } else if (task <= 5) {
                    userroletype = "GOOD"
                    image = "https://cdn.discordapp.com/attachments/1193112697886224384/1226438015878959164/good.png?ex=6624c469&is=66124f69&hm=2e3fd58a0c82701459603fb43ccb638e766aa1ca4080d374881187e9ca9407ce&"
                    color = "00ff00"
                } else if (task <= 10) {
                    userroletype = "CAUTION"
                    image = "https://cdn.discordapp.com/attachments/1193112697886224384/1226433964273565798/CAUTION.jpg?ex=6624c0a3&is=66124ba3&hm=fddb865d2488010f4ee7845baf875176dc558b3ea43ba4a856346c3ea21ae99c&"
                    color = "ff8c00"
                } else if (task <= 15) {
                    userroletype = "WARNING"
                    image = "https://cdn.discordapp.com/attachments/1193112697886224384/1226433963082387557/warning.jpeg?ex=6624c0a2&is=66124ba2&hm=3ae95b2f9c3450410d3a35eb9558765ec35997ad1b346e75fb52eaec265bbe81&"
                    color = "dc143c"
                } else if (task <= 20) {
                    userroletype = "DANGER"
                    image = "https://cdn.discordapp.com/attachments/1193112697886224384/1226438866492457041/DANGER.png?ex=6624c533&is=66125033&hm=336af0b2a9288bc2741fdce1f72540b6e9d09af9227ae882d650941530ccecde&"
                    color = "800080"
                } else {
                    userroletype = "UNKNOWN"
                    image = "https://cdn.discordapp.com/attachments/1193112697886224384/1226439287537664041/Frieren_matakenkasiteru_remove.png?ex=6624c598&is=66125098&hm=a2fa537daf559769324728992e89151075422b1570501bab2b15e2f2c5b76579&"
                    color = "4b0082"
                }
                let roletext = "NO TASK ROLE"
                //仕事量過多なら
                if (member.roles.cache.has('1206595486711029833')) {
                    roletext = "TASK MORE ROLE"
                    //仕事量過少なら
                } else if (member.roles.cache.has('1226200945948627074')) {
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
        let more = interaction.options.getNumber("more_role") ?? 100;
        let highlist = [];

        const members = await interaction.guild.members.fetch();
    await interaction.deferReply();
    members.forEach((member) => {
    
    interaction.guild.members.fetch(member.id).then(user => {
        let cache = user.roles.cache
        let moretask = 0;
        cache.forEach((value, key) => {
            switch (value.color) {
                case 3447003: moretask += 2; break;
                case 3066993: moretask += 1; break;
                case 15844367: moretask += 3; break;
                case 15105570: moretask += 4; break;
            }
        });
        //OR MORE
        if (moretask >= more && !member.roles.cache.has('1195727562547138611') && !member.roles.cache.has('1196399507391385613')) {
            highlist[highlist.length] = member.displayName;
        }
        //最高値が指定されているか
    if (more != 100) {
        interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`TASK LEVEL ${more} OR MORE`)
                    .addFields([{name:`${highlist}`,value:`TASK量${more}以上`}])
                    .setColor('00008b')
            ]
        });
    }
    })
    })
        


        } else if (interaction.options.getSubcommand() === 'less') {
    let less = interaction.options.getNumber("less_role") ?? -1;
    let badlist = [];
    const members = await interaction.guild.members.fetch();
    await interaction.deferReply();
    members.forEach((member) => {
    
    interaction.guild.members.fetch(member.id).then(user => {
        let cache = user.roles.cache
        let task = 0;
        cache.forEach((value, key) => {
            switch (value.color) {
                case 3447003: task += 2; break;
                case 3066993: task += 1; break;
                case 15844367: task += 3; break;
                case 15105570: task += 4; break;
            }
            
            
        });
        //OR LESS
        //もしタスク量が指定量に満たなかった場合、botロールかつさーぶあかロールを保持していない場合
        if (task <= less && !member.roles.cache.has('1195727562547138611') && !member.roles.cache.has('1196399507391385613')) {
            badlist[badlist.length] = member.displayName;
        }
        //最低値が指定されているか
    if (less != -1) {
        interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`TASK LEVEL ${less} OR LESS`)
                    .addFields([{name:`${badlist}`,value:`TASK量${less}以下`}])
                    .setColor('8b0000')
            ]
        });
    }
})
})
}
}
};