const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioResource, StreamType,
    createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior, generateDependencyReport, AudioPlayer,
    AudioResource } = require("@discordjs/voice");
const discord_id = require("../../id")
console.log(generateDependencyReport());

const { SlashCommandBuilder, EmbedBuilder, Colors, ChatInputCommandInteraction } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        //コマンド名前
        .setName('warning')
        //コマンドの説明
        .setDescription('Replies with Pong!')
        .addSubcommand((subcommand) =>
            subcommand
                .setName("test")
                .setDescription("おはよう")
        ),

    async execute(interaction) {

        const guild = interaction.guild;
        const member = await guild.members.fetch(interaction.member.id);
        const memberVC = member.voice.channel;


        const connection = joinVoiceChannel({
            guildId: guild.id,
            channelId: memberVC.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfMute: false,
        });
        await interaction.reply("Play WARNING_1...");//返信

        await getAttachmentURL(interaction, discord_id.warn_sounds, discord_id.warn_message["WARNING_1"]).then(async (url) => {
            /*** @type {AudioResource}*/
            let resource = createAudioResource(url, {
                inputType: StreamType.Arbitrary,
            });
            /*** @type {AudioPlayer}*/
            let player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });


            let play = async (startup) => {
                /**resource = createAudioResource(url, {
                    inputType: StreamType.Arbitrary,
                });
                player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    },
                });**/
                let _resource = createAudioResource(url, {
                    inputType: StreamType.Arbitrary,
                });
                player.play(_resource);
                /TODO: #2 音声の繰り返し再生時の挙動を修正する/
                if (startup) {
                    const promises = [];
                    promises.push(entersState(player, AudioPlayerStatus.AutoPaused, 1000 * 10));//10秒 or 自動停止されるまで処理停止
                    promises.push(entersState(connection, VoiceConnectionStatus.Ready, 1000 * 10));//10秒 or 準備完了まで処理停止
                    await Promise.race(promises);//上2つのどちら速い方が終わるまで待つ、ただし片方完了したらもう片方は実行停止
                    await Promise.all([...promises]);//上2つが終わるまで待つ
                    connection.subscribe(player);//スピーカーを刺す
                }
                await entersState(player, AudioPlayerStatus.Playing, 100);
                await entersState(player, AudioPlayerStatus.Idle, 2 ** 31 - 1);//2,147,483,647ミリ秒後にタイムアウト
                //connection.disconnect();
            }
            for (let count = 0; count < 5; count++) {
                await play(count == 0);
                console.log(`replay(再生回数: ${count})`)
                //player.stop(true)
                ////刺した状態でさらに刺すことは不可なので抜く。
                if (count == 4) {
                    connection.destroy();// 接続を切断
                }
            }
        })
    }
}
/**
 * @param {ChatInputCommandInteraction} interaction 
 * @param {string} channelID 
 * @param {string} messageID 
 * @returns {Promise<string>}
 */
let getAttachmentURL = (interaction, channelID, messageID) => {
    return new Promise((resolve, reject) => {
        interaction.guild.channels.fetch(discord_id.warn_sounds).then(channel => {
            channel.messages.fetch(discord_id.warn_message.WARNING_1).then(message => {
                message.attachments.map((value, key) => {
                    resolve(value.url)
                })
            }).catch((re) => { reject(re) })
        }).catch((re) => { reject(re) })
    })
}