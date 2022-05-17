module.exports.run = async ({ isDev, client, message, args }) => {
    client.user.setPresence({
        activity: {
            name: args.join(" "),
            type: "PLAYING"
        },
        status: "online"
    });
};

module.exports.config = {
    name: "activity",
    en: {
        name: "activity",
        usage: "- [some_activity]",
        description: "Change this bot's activity."
    },
    ko: {
        name: "활동",
        usage: "- [변경할_활동]",
        description: "이 봇의 활동을 바꿉니다."
    },
    category: "dev",
    aliases: ["활동"],
    permissions: 2
};