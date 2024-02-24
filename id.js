const ids =
/*default
{
    server: '1192783677386674256',
    userChannels: {
        All: '1204422180121747488',
        Usr: '1204422261319274527',
        Bot: '1204422359143157811'
    },
    reportParent: '1195712382798930022',
    log: '1195747894704209960',
    reportMember: '1074320635855126538',
    Permisson: [
        '1195719181656662148',
        '1196278442153488485',
        '1192986048213553213'
    ]
}*/

//mameeenn_debug
{
    server: '1061835609477500969',
    userChannels: {
        All: '1206224311694655569',
        Usr: '1206224374781186118',
        Bot: '1206224405605130310'
    },
    reportParent: '1205839267813916702',
    log: '1205887997556555806',
    reportMember: '778582802504351745',
    Permisson: [
        '1205844969743458355'
    ]
}
//*/

module.exports = {
    ...ids,
    IfPermissonGet: (interaction) => {
        let notHasPermisson = true;
        ids.Permisson.forEach(element => {
            if (interaction.member.roles.cache.has(element))
                notHasPermisson = false;
        })
        return notHasPermisson;
    }
}