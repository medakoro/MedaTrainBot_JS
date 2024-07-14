require("dotenv").config();

module.exports = {
    ID: { ...require("./utils/id")[process.env.server], ...require("./utils/id") },//それぞれのサーバーにあったIDと全体像を出力
    AttachmentURL: require("./utils/getAttachmentURL")
}