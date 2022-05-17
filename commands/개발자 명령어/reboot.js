module.exports.run = ({ db, message, exec }) => {
    db.set("restart", { is: true, time: Date.now(), channel: message.channel.id });
    message.channel.send("Rebooting...").then(() => {
        exec("sudo reboot");
    });
};

module.exports.config = {
    name: "reboot",
    en: {
        name: "reboot",
        usage: "-",
        description: "Reboots the hardware."
    },
    ko: {
        name: "재부팅",
        usage: "-",
        description: "하드웨어를 재부팅합니다."
    },
    category: "dev",
    aliases: ["reboot", "재부팅"],
    permissions: 3
}