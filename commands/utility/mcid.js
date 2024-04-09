const { SlashCommandBuilder, channelMention, userMention, EmbedBuilder, Colors, PermissionsBitField, ChatInputCommandInteraction } = require('discord.js');
const fs = require('fs');
const discord_id = require('../../id');
require("dotenv").config({ path: "../../" })

module.exports = {
    data: new SlashCommandBuilder()
        //コマンド名前
        .setName('mcid')
        //コマンドの説明
        .setDescription('MCIDを登録/確認/削除ができるコマンドです')
        .addSubcommand((subcommand) =>
            subcommand
                .setName("add")
                .setDescription("新しくMCIDを登録する")
                .addStringOption((option) => option
                    .setName('addmcid')
                    .setDescription('MCIDを入力')
                    .setRequired(true),
                )
                .addUserOption((option) => option
                    .setName('crwmember')
                    .setDescription('MCIDを登録するCRWメンバーを選択')
                    .setRequired(true),
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("list")
                .setDescription("MCIDを確認する")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("delete")
                .setDescription("MCIDを削除する")
                .addStringOption((option) => option
                    .setName("deletemcid")
                    .setDescription("削除するMCID名")
                    .setRequired(true),
                )
        ),
    /**
     * インタラクションが作成されたときに呼ばれるイベントのリスナー関数
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'add') {

            var addmcid = interaction.options.getString("addmcid")
            var addmcidmember = interaction.options.getMember("crwmember")
            if (discord_id.IsHasNoPermisson(interaction) && interaction.member.id != addmcidmember.id) {
                await interaction.reply({ content: "✖エラー!:\`Mismatch between MCID registrant and command executor\`\nどうやら、MCID登録者とコマンド実行者の不一致が確認されました。他人のMCIDは登録しないでください。\n(なお、管理職の場合はめだころに連絡してください)" });
            } else {
                const testObj = {
                    mdic: addmcid,
                    crwmember: addmcidmember.id,
                    addmember: interaction.member.id,
                };
                const createFile = (pathName, source) => {
                    const toJSON = JSON.stringify(source);
                    fs.writeFile(pathName, toJSON, (err) => {
                        interaction.reply({ content: `〇Successfully:正常にMCIDファイルが作成されました\nFileName:${addmcid}.json` })
                    });
                };

                createFile(`${process.env.root}/MCIDdata/${addmcid}.json`, testObj);
            }
        } else if (interaction.options.getSubcommand() === 'list') {
            const files = fs.readdirSync(`${process.env.root}/MCIDdata`);
            interaction.reply({ content: `All MCID Files:${files}` })
            /*
        } else if (interaction.options.getSubcommand() === 'delete') {
                var deletemcid = interaction.options.getString("deletemcid")
                const url = `${process.env.root}/MCIDdata/${deletemcid}.json`;
                fetch(url)
                    .then( response => response.json())
                    .then( data => jsondata);
            if (!(interaction.member.roles.cache.has('1192986404142207136') || interaction.member.roles.cache.has('1192986048213553213')) && interaction.member.id != addmcidmember.id) {
                await interaction.reply({ content: "✖エラー!:\`Mismatch between MCID registrant and command executor\`\nどうやら、MCID登録者とコマンド実行者の不一致が確認されました。他人のMCIDは登録しないでください。\n(なお、管理職の場合はめだころに連絡してください)"});
            } else {
                
            }
            */
        }
    },
};
