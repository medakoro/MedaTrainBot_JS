const Discord = require("discord.js");
/**
 * @param {Discord.Client} client
 * @param {Discord.Channel|string} channelID 
 * @param {string} messageID 
 * @returns {Promise<string>}
 */
const getAttachmentURL = (client, channelID, messageID) => {
    return new Promise((resolve, reject) => {
        if (typeof channelID === "string") channelID = client.channels.fetch(channelID).then(
            ch => {//channelIDがstringだったらchannelに変換する
                if (!ch) { reject("getAttachmentURL:channelID is wrong!"); return; }
                else channelID = ch
            }).catch((re) => { reject(re); return; })

        channelID.messages.fetch(messageID).then(message => {
            if (!message) { reject("getAttachmentURL:messageID is wrong!"); return; }
            else message.attachments.map((value, key) => { resolve(value.url) })
        }).catch((re) => { reject(re) })
    })
}
module.exports = getAttachmentURL