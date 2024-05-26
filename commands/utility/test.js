//https://discord.com/channels/1192783677386674256/1244260019227070514/1244260442382012427

const { SlashCommandBuilder, ChatInputCommandInteraction, TextChannel } = require('discord.js');
const discord_id = require("../../id")

module.exports = {
    data: new SlashCommandBuilder()
        //コマンド名前
        .setName('getmessage')
        //コマンドの説明
        .setDescription('...?'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        interaction.guild.channels.fetch(discord_id.warn_sounds).then(
            /**
             * @param {TextChannel} channel 
             */
            channel => {
                channel.messages.fetch(discord_id.warn_message.WARNING_1).then(message => {
                    message.attachments.map((value, key) => {
                        console.log(value.url)
                    })
                })
            })
    }
};