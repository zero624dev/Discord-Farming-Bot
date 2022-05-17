module.exports.run = p => {
    p.message.channel.send("Reloading...").then(async msg => {
        p.perf.start();
        p.fcs.autoUpdater(p);
        let data = await p.fcs.loadCMD(p);
        p.fcs = p.importFresh(p.dirname + "/modules/functions");
        p.items = p.importFresh(p.dirname + "/modules/items");
        msg.edit(`Reloaded (${data.success}/${data.total}) commands${data.failedCmdsArr.length > 0 ? `, Failed to load (${data.failedCmdsArr.join(", ")})` : ""} (${Math.round(p.perf.stop().time * 100) / 100}ms)`);
    });
};

module.exports.config = {
    name: "reload",
    en: {
        name: "reload",
        usage: "-",
        description: "Reloads the bot commands."
    },
    ko: {
        name: "재로드",
        usage: "-",
        description: "커맨드을 다시 로드합니다."
    },
    category: "dev",
    aliases: ["reload", "리로드", "재로드"],
    permissions: 2
}