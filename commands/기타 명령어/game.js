module.exports.run = ({ message, db, findUser, args, Discord }) => {
    const embed = new Discord.MessageEmbed()
        .addField("명령어", "0buy\n0farm\n0inventory\n0item\n0money\n0shop\n0tutorial\n0use")
        .setColor("BLUE")
        .setFooter("Farming Game | Young Bot");
    return message.channel.send({ embeds: [embed] });
    const shop_items = {
        seed: [
            { name: "wheat_seed", price: 5 },
            { name: "test_seed", price: 1 }
        ]
    }
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
            .addField("Farming Game", "`tu`torial \n `fa`rm\n`sh`op \n`vi`sit [`username`] \n`se`t")
            .setColor("BLUE");
        message.channel.send({ embeds: [embed] }).then(msg_ => {
            const collector = new Discord.MessageCollector(
                message.channel,
                m => m.author.id === message.author.id, { time: 30000 }
            );
            collector.on("collect", msg => {
                msg.delete();
                const args_ = msg.content.split(" ");
                if (["tu", "tutorial"].includes(args_[0])) {
                    collector.stop("selected");
                    tutorial(msg_);
                }
                //else if (["fa", "farm"].includes(args_[0])) { collector.stop("selected"); farm(msg_); }
                else if (["sh", "shop"].includes(args_[0])) {
                    collector.stop("selected");
                    shop(msg_);
                } else if (["vi", "visit"].includes(args_[0])) {
                    collector.stop("selected");
                    visit(args_.slice(1), msg_);
                } else if (["se", "set"].includes(args_[0])) {
                    collector.stop("selected");
                    settings(msg_);
                }
            });
            collector.on("end", (m, r) => {
                if (r == "time") {
                    const embed = new Discord.MessageEmbed()
                        .setDescription("**NO OPTION SELECTED**")
                        .setColor("RED");
                    msg_.edit({ embeds: [embed] });
                }
            });
        });
    } else if (["tu", "tutorial", "튜토리얼", "튜토"].includes(args[0])) tutorial();
    //else if (["fa", "farm", "팜", "농장"].includes(args[0])) farm();
    else if (["sh", "shop", "샵", "상점"].includes(args[0])) shop();
    else if (["vi", "visit", "방문"].includes(args[0])) visit(args.slice(1));
    else if (["se", "setting", "세팅", "설정"].includes(args[0])) settings();
    else return message.channel.send("`Command Not Found.\n!help game`")

    function tutorial(msg_) {
        if (!db.get(`farm.${message.author.id}`)) {
            let text = message.guild.region == "south-korea" ? "처음이시네요.\n계정을 추가하겠습니다." : "You are the first time.\nI'll create your account.";
            let footer = message.guild.region == "south-korea" ? "🇸를 눌러 스킵하거나 🇳을 눌러 다음으로 가주세요" : "press 🇸 to skip or 🇳 to next";
            const embed = new Discord.MessageEmbed()
                .setDescription(text)
                .setColor("BLUE")
                .setFooter(footer);
            if (!msg_) {
                message.channel.send({ embeds: [embed] }).then(msg => { tutorial_next(msg); });
            } else {
                msg_.edit({ embeds: [embed] }).then(msg => { tutorial_next(msg); });
            }
            make_Account();
        } else {
            if (!msg_) {
                msg_.edit({ embeds: [embed] }).then(msg => { tutorial_next(msg); });
            } else {
                const embed = new Discord.MessageEmbed()
                    .setDescription("**PREPARING**")
                    .setColor("RED")
                    .setFooter("Farming Game | Young Bot");
                msg.edit({ embeds: [embed] });
            }
        }
    }

    function make_Account() {
        const json = {
            money: 100, //코인
            inventory: {}, //인벤토리
            farm: {
                used: [], //심어진 작물 {이름: 다 자라기 남은 시간}
                count: 0 //경작지 갯수
            }
        }
        db.set(`farm.${message.author.id}`, json);
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

    function farm(msg_) {
        if (!db.get(`farm.${message.author.id}`)) return message.channel.send("`please go to tutorial`");
        const embed = new Discord.MessageEmbed()
            .setDescription("**PREPARING**")
            .setColor("RED")
            .setFooter("Farming Game | Young Bot");
        if (!msg_) return message.channel.send({ embeds: [embed] });
        else return msg_.edit({ embeds: [embed] })
    }

    function shop(msg_) {
        if (!db.get(`farm.${message.author.id}`)) return message.channel.send("`please go to tutorial`");
        const embed = new Discord.MessageEmbed()
            .addField("Shop", "`s`eed \n`l`and")
            .setColor("BLUE")
            .setFooter("Farming Game | Young Bot");
        if (!msg_) return message.channel.send({ embeds: [embed] }).then(msg => { shop_next(msg) });
        else return msg_.edit({ embeds: [embed] }).then(msg => { shop_next(msg) });
    }

    function shop_next(msg_) {
        const collector = new Discord.MessageCollector(
            message.channel,
            m => m.author.id === message.author.id, { time: 30000 }
        );
        collector.on("collect", msg => {
            msg.delete();
            const args_ = msg.content.split(" ");
            if (["s", "seed"].includes(args_[0])) {
                collector.stop("selected");
                shop_details(msg_, "seed");
            }
            if (["l", "land"].includes(args_[0])) {
                collector.stop("selected");
                shop_details(msg_, "land");
            }
        });
        collector.on("end", (m, r) => {
            if (r == "time") {
                const embed = new Discord.MessageEmbed()
                    .setDescription("**NO OPTION SELECTED**")
                    .setColor("RED");
                msg_.edit({ embeds: [embed] });
            }
        });
    }

    function shop_details(msg_, kind) {
        let items_text = ""
        for (let i = 0; i < shop_items[kind].length; i++) {
            if (i == shop_items[kind].length - 1)
                items_text += `\`${i}\`) ${shop_items[kind][i].name}: ${shop_items[kind][i].price} coin`
            else
                items_text += `\`${i}\`) ${shop_items[kind][i].name}: ${shop_items[kind][i].price} coin\n`
        }
        const embed = new Discord.MessageEmbed()
            .addField("Seeds Shop", items_text)
            .setColor("BLUE")
            .setFooter("type !game buy [item_number] [item_count] to buy items");
        msg_.edit({ embeds: [embed] })
    }

    function visit(args_, msg_) {
        const member = findUser(args_.join(" ")) || message.author
        if (!db.get(`farm.${member.id}`)) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${member.username}'s Farm`)
                .setDescription("**USER NOT DEFINED**")
                .setColor("RED")
                .setFooter("Farming Game | Young Bot");
            if (!msg_) return message.channel.send({ embeds: [embed] });
            else return msg_.edit({ embeds: [embed] })
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${member.username}'s Farm`)
                .setDescription("**PREPARING**")
                .setColor("RED")
                .setFooter("Farming Game | Young Bot");
            if (!msg_) return message.channel.send({ embeds: [embed] });
            else return msg_.edit({ embeds: [embed] })
        }
    }

    function settings(msg_) {
        if (!db.get(`farm.${message.author.id}`)) return message.channel.send("`please go to tutorial`");
        const embed = new Discord.MessageEmbed()
            .addField("Settings", "`a`larm")
            .setColor("BLUE")
            .setFooter("Farming Game | Young Bot");
        if (!msg_) return message.channel.send({ embeds: [embed] });
        else return msg_.edit({ embeds: [embed] })
    }
};

module.exports.config = {
    name: "game",
    aliases: ["게임"],
    en: {
        name: "game",
        usage: "-",
        description: "None"
    },
    ko: {
        name: "게임",
        usage: "-",
        description: "그냥 농사게임"
    },
    category: "fun"
};