module.exports.run = ({ config, fs, dirname, db, message, fcs }) => {
    fcs.autoUpdater({ config, fs, dirname });
    db.set("restart", { is: true, time: Date.now(), channel: message.channel.id });
    message.channel.send("Restarting...").then(() => {
        process.exit();
    });
};

module.exports.config = {
    name: "restart",
    en: {
        name: "restart",
        usage: "-",
        description: "Restarts the bot."
    },
    ko: {
        name: "재시작",
        usage: "-",
        description: "봇을 재시작합니다."
    },
    category: "dev",
    aliases: ["r", "re", "재시작"],
    permissions: 2
}