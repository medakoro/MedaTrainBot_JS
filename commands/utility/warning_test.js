const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior, generateDependencyReport } = require("@discordjs/voice");

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
    const status = ["●Loading Sounds...", `●Connecting to ${memberVC}...`];
    const p = interaction.reply(status.join("\n"));


  const connection = joinVoiceChannel({
    guildId: guild.id,
    channelId: memberVC.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfMute: false,
  });


  const resource = createAudioResource("https://cdn.discordapp.com/attachments/1244260019227070514/1244260442365493319/WARNING_1.mp3?ex=66547756&is=665325d6&hm=75d12fa901d1a9ed0dce6c42aa1c6158f1e223c520570d07fa549c8beda721d3&",{
                inputType: StreamType.Arbitrary,
            });


  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });



  player.play(resource);
  const promises = [];
  promises.push(entersState(player, AudioPlayerStatus.AutoPaused, 1000 * 10).then(() => status[0] += "Done!"));
  promises.push(entersState(connection, VoiceConnectionStatus.Ready, 1000 * 10).then(() => status[1] += "Done!"));
  await Promise.race(promises);
  await p;
  await Promise.all([...promises, interaction.editReply(status.join("\n"))]);
  connection.subscribe(player);
  await entersState(player, AudioPlayerStatus.Playing, 100);

  await interaction.editReply("Playing");
  await entersState(player, AudioPlayerStatus.Idle, 2 ** 31 - 1);
  await interaction.editReply("End");
  let count = 0;
            player.on(AudioPlayerStatus.Idle, () => {
                count += 1;
                console.log(`再生回数: ${count}`);

                if (count < 5) {
                    player.play(resource); // リソースを再再生
                } else {
                    connection.destroy(); // 接続を切断
                }
            });
  }
}