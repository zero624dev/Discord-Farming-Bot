module.exports.run = async ({ message, db, Discord }) => {

    if (!db.get(`farm.user.${message.author.id}`)) {
        let text = message.guild.region == "south-korea" ? "처음이시네요.\n계정을 추가하겠습니다." : "You are the first time.\nI'll create your account.";
        let footer = message.guild.region == "south-korea" ? "🇸를 눌러 스킵하거나 🇳을 눌러 다음으로 가주세요" : "press 🇸 to skip or 🇳 to next";
        const embed = new Discord.MessageEmbed()
            .setDescription(text)
            .setColor("BLUE")
            .setFooter(footer);
        message.channel.send({ embeds: [embed] }).then(msg => { tutorial_next(msg); });
        make_Account();
    } else {
        const embed = new Discord.MessageEmbed()
            .setDescription("**PREPARING**")
            .setColor("RED")
            .setFooter("Farming Game | Young Bot");
        message.channel.send({ embeds: [embed] });
    }

    function make_Account() {
        const json = {
            money: 120, //코인
            inventory: {}, //인벤토리
            farm: {
                used: [], //심어진 작물 {name: 이름, time: 심은 날짜}
                count: 1 //경작지 갯수
            },
            field: [] //다른 땅
        }
        db.set(`farm.user.${message.author.id}`, json);
    }

    function tutorial_next(msg) {
        msg.react("🇸").then(re => {
            msg.react("🇳");
            const reactFilter = (reaction, user) => !user.bot;
            const collector = msg.createReactionCollector(reactFilter, {
                time: 60000
            });
            collector.on("collect", (r, user) => {
                r.users.remove(user.id);
                if (user.id !== message.author.id) return;
                if (r.emoji.name === "🇸") {
                    let text = message.guild.region == "south-korea" ? "스킵되었습니다." : "Was Skipped";
                    const embed = new Discord.MessageEmbed()
                        .setDescription(text)
                        .setColor("BLUE")
                        .setFooter("Farming Game | Young Bot");
                    msg.edit({ embeds: [embed] });
                    msg.reactions.removeAll();
                    collector.stop("selected");
                } else if (r.emoji.name === "🇳") {
                    const embed = new Discord.MessageEmbed()
                        .setDescription("**PREPARING**")
                        .setColor("RED")
                        .setFooter("Farming Game | Young Bot");
                    msg.edit({ embeds: [embed] });
                    msg.reactions.removeAll();
                    collector.stop("selected");
                }
            });
            collector.on("end", (m, r) => {
                if (r == "time") {
                    msg.reactions.removeAll();
                    const embed = new Discord.MessageEmbed()
                        .setDescription("**NO OPTION SELECTED**")
                        .setColor("RED");
                    msg.edit({ embeds: [embed] });
                }
            });
        });
    }
};

module.exports.config = {
    name: "tutorial",
    en: {
        name: "tutorial",
        usage: "-",
        description: "None"
    },
    ko: {
        name: "튜토리얼",
        usage: "-",
        description: "없음"
    },
    category: "fun",
    aliases: ["튜토리얼"]
};