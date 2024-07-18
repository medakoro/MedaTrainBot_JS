const ytdl = require('ytdl-core');
const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel,  StreamType } = require('@discordjs/voice');
const fs = require('fs');   

const { SlashCommandBuilder, EmbedBuilder, Colors, ChatInputCommandInteraction } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        //command name
        .setName('musicplayer')
        .setDescription('Youtubeから音楽を流す')
            .addSubcommand((subcommand) =>
                subcommand
                .setName("start")
                .setDescription("曲再生開始")
                    .addStringOption((option) => option
                        .setName('youtube_link')
                        .setDescription('ytリンク')
                        .setRequired(true),
                )
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("instant_start")
                    .setDescription("音楽停止&VC退出")
                    .setDescription("曲再生開始")
                    .addStringOption((option) => option
                        .setName('play')
                        .setDescription('流す曲')
                        .setRequired(true),
            )  
        )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("stop")
                    .setDescription("音楽停止&VC退出")
            ),


            /**
     * インタラクションが作成されたときに呼ばれるイベントのリスナー関数
     * @param {ChatInputCommandInteraction} interaction
     */
            async execute(interaction) {
        if (interaction.options.getSubcommand() === 'start') {
            //リンクを取得
            const url = interaction.options.getString("youtube_link");
            if (!ytdl.validateURL(url)) return interaction.reply(`${url}は処理できません。`);
            
            await interaction.reply({ content : `${url} を再生します` })

            // コマンドを実行したメンバーがいるボイスチャンネルを取得
            const channel = interaction.member.voice.channel;
            
            // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
            if (!channel) return interaction.reply('先にボイスチャンネルに参加してください！');
            // VCに参加しているかつ再生が終了したら一回抜ける
            if (!channel) return connection.destroy();
            if (!channel) return await interaction.reply({ content : `音楽が停止しました` })

            // チャンネルに参加
            const connection = joinVoiceChannel({
                adapterCreator: channel.guild.voiceAdapterCreator,
                channelId: channel.id,
                guildId: channel.guild.id,
                selfDeaf: true,
                selfMute: false,
            });
            const player = createAudioPlayer();
            connection.subscribe(player);

            // 動画の音源を取得
            const stream = ytdl(ytdl.getURLVideoID(url), {
              filter: format => format.audioCodec === 'opus' && format.container === 'webm', //webm opus
            quality: 'highest',
              highWaterMark: 32 * 1024 * 1024, // https://github.com/fent/node-ytdl-core/issues/902
            });
            const resource = createAudioResource(stream, {
            inputType: StreamType.WebmOpus
            });

            // 再生
            player.play(resource);
            await entersState(player,AudioPlayerStatus.Playing, 10 * 1000);
            await entersState(player,AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);
            
        } else if (interaction.options.getSubcommand() === 'stop') {

            await interaction.reply({ content : `VCを退出しました` })
        // 再生が終了したら抜ける
        const channel = interaction.member.voice.channel;

        const connection = joinVoiceChannel({
            adapterCreator: channel.guild.voiceAdapterCreator,
            channelId: channel.id,
            guildId: channel.guild.id,
            selfDeaf: true,
            selfMute: false,
        });
        connection.destroy(); 
        } else if (interaction.options.getSubcommand() === 'instant_start') {
        //曲名があるか
        const soundname = interaction.options.getString("play");
        var error = false;
        const data = JSON.parse(fs.readFileSync("C:\\Users\\user\\Desktop\\DiscordBots\\MedaTrainBot_JS-main\\musicplayer.json"))
        console.log(data)

                if (!error) {
                    await interaction.reply({ content : `[${soundname}](${playurl}) を再生します` })
                    // コマンドを実行したメンバーがいるボイスチャンネルを取得
                    const channel = interaction.member.voice.channel;

                     // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
                    if (!channel) return interaction.reply('先にボイスチャンネルに参加してください！');

                    // VCに参加しているかつ再生が終了したら一回抜ける
                    if (!channel) return connection.destroy();
                    if (!channel) return await interaction.reply({ content : `音楽が停止しました` })

                    // チャンネルに参加
                    const connection = joinVoiceChannel({
                        adapterCreator: channel.guild.voiceAdapterCreator,
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        selfDeaf: true,
                        selfMute: false,
                    });
                    const player = createAudioPlayer();
                    connection.subscribe(player);

                    // 動画の音源を取得
                    const stream = ytdl(ytdl.getURLVideoID(playurl), {
                        filter: format => format.audioCodec === 'opus' && format.container === 'webm', //webm opus
                        quality: 'highest',
                        highWaterMark: 32 * 1024 * 1024, // https://github.com/fent/node-ytdl-core/issues/902
                    });
                    const resource = createAudioResource(stream, {
                        inputType: StreamType.WebmOpus
                    });

                    // 再生
                    player.play(resource);
                    await entersState(player,AudioPlayerStatus.Playing, 10 * 1000);
                    await entersState(player,AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);
                        }


                }
            }
        }