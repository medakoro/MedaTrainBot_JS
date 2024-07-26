const { SlashCommandBuilder, EmbedBuilder, Colors, ChatInputCommandInteraction , Client, Message, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalSubmitInteraction, ButtonInteraction, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('new_announce')
        .setDescription('announceコマンド。詳細はCRW、コマンドを参照')
        .addSubcommand((subcommand) =>
            subcommand
                .setName("train_stop")
                .setDescription("鉄道状態アナウンス[運転停止/遅延発生情報]")
                /*.addStringOption((option) => option
                    .setName('stop_type')
                    .setDescription('今回のタイプ')
                    .addChoices(
                        { name: "運転停止", value: "trainstop" },
                        { name: "遅延発生", value: "traindelay" }
                    )
                    .setRequired(true),
                )
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
                )*/
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("train_restart")
                .setDescription("鉄道状態アナウンス[運転再開/遅延解除情報]")
                /*.addStringOption((option) => option
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
                )*/
        ),
    /**
 * インタラクションが作成されたときに呼ばれるイベントのリスナー関数
 * @param {ChatInputCommandInteraction} interaction
 */


    async execute(interaction) {
            //ロールなしエラー
            if (!interaction.member.roles.cache.has('1192986404142207136')) {
            await interaction.reply({ content: `エラー:実行権限がありませんでした。\n実行権限を持ち合わせている場合、めだころかまんめんさんに連絡してください。`, ephemeral: true });
        } else

            //subcommand == 運転停止/遅延発生情報
            if (interaction.options.getSubcommand() === 'train_stop') {
                const Rows = [];
        const AddTextInput = (ID, label, short = true, required = false) => {
            Rows.push(new ActionRowBuilder().addComponents(new TextInputBuilder()
                .setCustomId(ID.toLowerCase())
                .setLabel(label)
                .setStyle(short ? TextInputStyle.Short : TextInputStyle.Paragraph)
                .setRequired(required)));
        }
        if (this.modal == 0) {
                AddTextInput("title", "埋め込みの名前", true, !Edit)
                AddTextInput("url", "埋め込みURL (任意)")
                AddTextInput("authoricon", "上部に表示するアイコンのURL (任意)")
                AddTextInput("authorname", "上部に表示する名前 (任意)")
                AddTextInput("authorurl", "上部に表示するURL (任意)")
        } else {
                AddTextInput("error", "エラーです！フォームを閉じてください※送信するとバグります")
        }
        const modal = new ModalBuilder()
            .setCustomId('embedcreater')
            .setTitle(`埋め込みの作成(${this.modal + 1}/2)`);
        modal.components = Rows;
        if (this.interaction.user.id === interaction.user.id)
            await interaction.showModal(modal)


                //変数に代入
                const stop_section = interaction.options.getString("stop_section");
                const stop_reason = interaction.options.getString("stop_reason");
                const stop_repire = interaction.options.getString("stop_repire");
                const stop_discoverer = interaction.options.getMember("stop_discoverer");
                const stop_info = interaction.options.getString("stop_info") ?? "なし";
                var stop_type = interaction.options.getString("stop_type");

                //現在時刻取得
                var now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));

                var Year = now.getFullYear();
                var Month = now.getMonth() + 1;
                var Day = now.getDate();
                var Hour = now.getHours();
                var Min = now.getMinutes();
                var Sec = now.getSeconds();

                var now_time = Year + "/" + Month + "/" + Day + " " + Hour + ":" + Min + ":" + Sec;


                //apiにして鯖に送る
                const https = require("https"); // HTTPのモジュール
                //ここでJsonのもととなるオブジェクトを作る
                let json = {
                    train: {
                        trainstop_information: {
                            type: stop_type,
                            stop_section: stop_section,
                            stop_reason: stop_reason,
                            stop_repire: stop_repire,
                            stop_info: stop_info
                        },
                        stop_train_time: now_time
                    },
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

                //変数を変換
                if (stop_type == "trainstop") {
                    stop_type = "運転停止";
                } else if (stop_type == "traindelay") {
                    stop_type = "遅延発生";
                } else {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('Error :', stop_type)
                                .setColor(Colors.DarkPurple)
                        ]
                    });
                }

                //埋め込み
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('鉄道状態アナウンス[運転停止/遅延発生情報]を発表しました。')
                            .setColor(Colors.Red)
                    ]
                });

                await interaction.client.channels.cache.get('1195747894704209960').send({
                    content: "📣鉄道状態アナウンスが発令されました",
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `通達者: ${interaction.member.displayName}` })
                            .setTitle('鉄道状態アナウンス[運転停止/遅延発生情報 ID:')
                            .setFields([
                                { name: '今回のタイプ:', value: stop_type, inline: false },
                                { name: '💥停止区間:', value: stop_section, inline: false },
                                { name: '🧨原因:', value: stop_reason, inline: false },
                                { name: '🔨予想修理時間:', value: stop_repire, inline: false },
                                { name: '💬詳細情報:', value: stop_info, inline: false }
                            ])
                            .setColor(Colors.Red)
                            .setFooter({ text: `発見者: ${stop_discoverer.displayName} 発表時刻: ${now_time.displayName}` })
                    ]
                });
            } else if (interaction.options.getSubcommand() === 'train_restart') {
                //遅延解除or運転再開

                //変数に代入
                var restart_type = interaction.options.getString("restart_type");
                const restart_section = interaction.options.getString("restart_section");
                const restart_repire = interaction.options.getString("restart_repire");
                const restart_now = interaction.options.getString("restart_now") ?? "遅延再開のためなし。";
                const restart_info = interaction.options.getString("restart_info") ?? "なし";

                //変数変換
                if (restart_type == "restart_trainstop") {
                    restart_type = "運転再開";
                } else if (restart_type == "no_traindelay") {
                    restart_type = "遅延解除";
                } else {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('Error :', stop_type)
                                .setColor(Colors.DarkPurple)
                        ]
                    });
                }

                //送信
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
                                { name: '今回のタイプ:', value: restart_type, inline: false },
                                { name: '✅解除区間:', value: restart_section, inline: false },
                                { name: '🛠️修理期間:', value: restart_repire, inline: false },
                                { name: '🚃鉄道状態(遅延再開ならなし):', value: restart_now, inline: false },
                                { name: '💬詳細情報:', value: restart_info, inline: false }

                            ])
                            .setColor(Colors.Aqua)
                    ]
                });
            }
    }
};
