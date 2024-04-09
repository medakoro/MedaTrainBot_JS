const ids =
//default
{
    server: '1192783677386674256',//guildID
    userChannels: {
        All: '1204422180121747488',//channelID(Text/VC)
        Usr: '1204422261319274527',//channelID(Text/VC)
        Bot: '1204422359143157811'//channelID(Text/VC)
    },
    reportParent: '1195712382798930022',//categoryID
    log: '1195747894704209960',//channelID(Text)
    reportMember: '1074320635855126538',//userID
    Permisson: [//roleID(array)
        '1195719181656662148',
        '1196278442153488485',
        '1192986048213553213'
    ],
    TooManyTask: '1206595486711029833',//roleID
    TooLittleTask: '1226200945948627074',//roleID
    SubAccountRole: '1196399507391385613',//roleID
    BotRole: '1195727562547138611'//roleID
}

//mameeenn_debug
/*{
    server: '1061835609477500969',//guildID
    userChannels: {
        All: '1206224311694655569',//channelID(Text/VC)
        Usr: '1206224374781186118',//channelID(Text/VC)
        Bot: '1206224405605130310'//channelID(Text/VC)
    },
    reportParent: '1205839267813916702',//categoryID
    log: '1205887997556555806',//channelID(Text)
    reportMember: '778582802504351745',//userID
    Permisson: [ //roleID(array)
        '1205844969743458355'
    ],
    TooManyTask: '1226820353515458601',//roleID
    TooLittleTask: '1226820411203784766',//roleID
    SubAccountRole: '1226822395575140392',//roleID
    BotRole: '1226822292693188690'//roleID
}*/
//*/

module.exports = {
    ...ids,
    IsHasNoPermisson: (interaction) => {
        let notHasPermisson = true;
        ids.Permisson.forEach(element => {
            if (interaction.member.roles.cache.has(element))
                notHasPermisson = false;
        })
        return notHasPermisson;
    }
}