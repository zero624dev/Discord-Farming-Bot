module.exports.run = ({ args, client, Discord, message, lines, getPrefix, getLang }) => {
    const lan = getLang();
    if (args[0]) {
        const command = args.join(" "),
            permitTxt = ["User", "Beta Tester", "Developer", "Owner"];
        let commandfile =
            client.commands.get(command) ||
            client.commands.get(client.aliases.get(command));
        if (commandfile) {
            const config = commandfile.config;
            const description = message.guild.region == "south-korea" ?
                `사용법: ${config.ko.usage} \n설명: ${config.ko.description} \n별명: ${config.aliases.join(", ") || 없음}` :
                `Usage: ${config.en.usage} \nDescription: ${config.en.description} \naliases: ${config.aliases.join(", ") || None}`;
            if (description) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`**${commandfile.config.name}** \`[${client.category.get(commandfile.config.name)}]\` \`[${lines[commandfile.config.name]}]\``)
                    .setDescription(lan == "ko" ? config.ko.description : config.en.description)
                    .addField(lan == "ko" ? "사용법" : "Usage", `\`${(lan == "ko" ? config.ko.usage : config.en.usage).replace(/ /g, "` `").replace("-", getPrefix() + command)}\``, false)
                    .addField(lan == "ko" ? "별명" : "aliases", lan == "ko" ? config.aliases.join(", ") || "없음" : config.aliases.join(", ") || "None", false)
                    .addField(lan == "ko" ? "사용 권한" : "Required Permissions", config.permissions ? `${config.permissions} [${permitTxt[config.permissions]}]` : "0 [User]", false)
                    .setColor("BLUE");
                message.channel.send({ embeds: [embed] });
            } else message.channel.send("`No description.`");
        } else {
            message.channel.send("`No such command.`");
        }
    } else {
        let category = {};
        Array.from(client.commands.keys()).forEach(file => {
            var config = client.commands.get(file).config;
            let cat = client.category.get(file)
            if (!category[cat]) category[cat] = { lines: 0, items: [] }
            category[cat].lines += lines[file];
            category[cat].items.push("`" + config[lan].name + "`");
        });
        const embed = new Discord.MessageEmbed()
            .setTitle("도움말")
            .setDescription(getPrefix() + "도움 [명령어] > 명령어 사용법 및 자세한 정보")
            .setColor("BLUE")
        Object.keys(category).forEach(key => {
            embed.addField(`${key} [${category[key].lines}]`, category[key].items.sort().join(", ") || (lan == "ko" ? "없음" : "None"))
        })
        embed.addField(`초대`, `[봇 초대](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot), [서버 초대](https://discord.gg/3w4aKhpUVy), [사이트](http://zero-bot.kro.kr)`)
        message.channel.send({ embeds: [embed] });
    }
};

module.exports.config = {
    name: "help",
    en: {
        name: "help",
        usage: "- [command(optional)]",
        description: "Displays help message."
    },
    ko: {
        name: "도움말",
        usage: "- [명령어(선택사항)]",
        description: "명령어의 사용법을 알려줍니다."
    },
    category: "utils",
    aliases: ["도움", "도움말", "?", "h"]
};