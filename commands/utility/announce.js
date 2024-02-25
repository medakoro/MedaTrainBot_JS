const { SlashCommandBuilder, EmbedBuilder, Colors, ChatInputCommandInteraction } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('announceコマンド。詳細はCRW、コマンドを参照')
        .addSubcommand((subcommand) =>
            subcommand
                .setName("train_stop")
                .setDescription("鉄道状態アナウンス[運転停止情報]")
                .addStringOption((option) => option
                    .setName('stop_section')
                    .setDescription('💥停止区間')
                    .setRequired(true),
                )
                .addStringOption((option) => option
                    .setName('stop_reason')
                    .setDescription('🧨原因')
                    .setRequired(true),
                )
                .addStringOption((option) => option
                    .setName('stop_repire')
                    .setDescription('🔨予想修理時間')
                    .setRequired(true),
                )
                .addUserOption((option) => option
                    .setName('stop_discoverer')
                    .setDescription('🙍発見者(CRWメンバーでないならMTBを選択してください)')
                    .setRequired(true),
                )
                .addStringOption((option) => option
                    .setName('stop_info')
                    .setDescription('💬詳細情報')
                    .setRequired(false),
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("train_restart")
                .setDescription("鉄道状態アナウンス[運転再開/遅延解除情報]")
                .addStringOption((option) => option
                    .setName('restart_type')
                    .setDescription('今回のタイプ')
                    .addChoices(
                        { name: "運転再開", value: "restart_trainstop" },
                        { name: "遅延解除", value: "no_traindelay" }
                    )
                    .setRequired(true),
                )
                .addStringOption((option) => option
                    .setName('restart_section')
                    .setDescription('✅解除区間')
                    .setRequired(true),
                )
                .addStringOption((option) => option
                    .setName('restart_repire')
                    .setDescription('🛠️修理期間')
                    .setRequired(true),
                )
                .addStringOption((option) => option
                    .setName('restart_now')
                    .setDescription('🚃鉄道状態(遅延再開ならなし)')
                    .setRequired(false),
                )
                .addStringOption((option) => option
                    .setName('restart_info')
                    .setDescription('💬詳細情報')
                    .setRequired(false),
                )
        ),
        /**
     * インタラクションが作成されたときに呼ばれるイベントのリスナー関数
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.member.roles.cache.has('1192986404142207136')) {
            await interaction.reply({ content: `エラー:実行権限がありませんでした。\n実行権限を持ち合わせている場合、めだころかまんめんさんに連絡してください。`, ephemeral: true });
        }
        //botid = botid + 1;
        if (interaction.options.getSubcommand() === 'train_stop') {

            const stop_section = interaction.options.getString("stop_section");
            const stop_reason = interaction.options.getString("stop_reason");
            const stop_repire = interaction.options.getString("stop_repire");
            const stop_discoverer = interaction.options.getMember("stop_discoverer");
            const stop_info = interaction.options.getString("stop_info") ?? "なし";

            //現在時刻取得
            let date = new Date();
            
            const https = require("https"); // HTTPのモジュール
            //ここでJsonのもととなるオブジェクトを作る
            let json = { 
                trainstop_information:{
                    stop_section:stop_section,
                    stop_reason:stop_reason,
                    stop_repire:stop_repire,
                    stop_info:stop_info
                },
                stop_train_time:date
            }
            try {
                const request = https.request(
                    //下のURLをいじる
                    "https://coherent-ruling-quagga.ngrok-free.app/medakoro_1", { method: 'POST', });
                request.write(JSON.stringify(json))
                request.end()
            } catch (ex) {
                //await interaction.editReply("put失敗！")
            }
            //await interaction.editReply("putしました。")

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle('鉄道状態アナウンス[運転停止情報]を発表しました。')
                    .setColor(Colors.Red)
                ]
            });
            
            await interaction.client.channels.cache.get('1195747894704209960').send({
                content: "📣鉄道状態アナウンスが発令されました",
                embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `通達者: ${interaction.member.displayName}` })
                    .setTitle('鉄道状態アナウンス[運転停止情報] ID:')
                    .setFields([
                        { name: '💥停止区間:', value: stop_section ,inline: false},
                        { name: '🧨原因:', value: stop_reason ,inline: false},
                        { name: '🔨予想修理時間:', value: stop_repire ,inline: false},
                        { name: '💬詳細情報:', value: stop_info ,inline: false}
                    ])
                    .setColor(Colors.Red)
                    .setFooter({ text: `発見者: ${stop_discoverer.displayName}` })
                ]
            });
        } else if (interaction.options.getSubcommand() === 'train_restart') {
            //遅延解除or運転再開
            var restart_type = interaction.options.getString("restart_type");
            const restart_section = interaction.options.getString("restart_section");
            const restart_repire = interaction.options.getString("restart_repire");
            const restart_now = interaction.options.getString("restart_now") ?? "遅延再開のためなし。";
            const restart_info = interaction.options.getString("restart_info") ?? "なし";

            if (restart_type == "restart_trainstop") {
                restart_type = "運転再開";
            } else if (restart_type == "no_traindelay") {
                restart_type = "遅延解除";
            }

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle('鉄道状態アナウンス[運転再開/遅延解除情報]を発表しました。')
                    .setColor(Colors.Blue)
                ]
            });

            await interaction.client.channels.cache.get('1195747894704209960').send({
                content: "📣鉄道状態アナウンスが発令されました",
                embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `通達者: ${interaction.member.displayName}` })
                    .setTitle('鉄道状態アナウンス[運転再開/遅延解除情報情報]ID:')
                    .setFields([
                        { name: '今回のタイプ:', value: restart_type ,inline: false},
                        { name: '✅解除区間:', value: restart_section ,inline: false},
                        { name: '🛠️修理期間:', value: restart_repire ,inline: false},
                        { name: '🚃鉄道状態(遅延再開ならなし):', value: restart_now ,inline: false},
                        { name: '💬詳細情報:', value: restart_info ,inline: false}
                        
                    ])
                    .setColor(Colors.Aqua)
                ]
            });
        }
    }
};
