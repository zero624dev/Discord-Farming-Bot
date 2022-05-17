module.exports.run = ({ fs, args, Discord, message }) => {
    const optionsObj = {
        clear: () => {
            if (!args[1]) {
                fs.writeFileSync("/home/ZERO/.pm2/logs/Bot-out.log", "");
                const cEmbed = new Discord.MessageEmbed()
                    .setTitle("Console")
                    .setDescription("Cleared!")
                    .setColor("BLUE");
                message.channel.send({ embed: cEmbed });
                fs.writeFileSync("/home/ZERO/.pm2/logs/Bot-error.log", "");
                const eEmbed = new Discord.MessageEmbed()
                    .setTitle("Errors")
                    .setDescription("Cleared!")
                    .setColor("RED");
                return message.channel.send({ embeds: [eEmbed] });
            }
            const option = args[1];
            if (option == "console") {
                fs.writeFileSync("/home/ZERO/.pm2/logs/Bot-out.log", "");
                const cEmbed = new Discord.MessageEmbed()
                    .setTitle("Console")
                    .setDescription("Cleared!")
                    .setColor("BLUE");
                return message.channel.send({ embeds: [cEmbed] });
            }
            if (option == "error") {
                fs.writeFileSync("/home/ZERO/.pm2/logs/Bot-error.log", "");
                const cEmbed = new Discord.MessageEmbed()
                    .setTitle("Errors")
                    .setDescription("Cleared!")
                    .setColor("RED");
                return message.channel.send({ embeds: [cEmbed] });
            }
        },
        console: () => {
            fs.readFile("/home/ZERO/.pm2/logs/Bot-out.log", "utf8", (err, data) => {
                if (err) return message.channel.send("Error!");
                let Data = data.split("\n");
                let finalData = [];
                for (let i = Data.length - 1; i >= 0; i--) {
                    if (Data.slice(i, Data.length - 1).join("\n").length > 1950) {
                        Data = Data.slice(i + 1, Data.length - 1);
                        break;
                    }
                    if (i == 0) {
                        break;
                    }
                }
                Data.forEach(data => {
                    if (data.startsWith("    ")) finalData.push("> " + data.slice(4).match(/.{1,65}/g).join("\n> "));
                    else finalData.push(data);
                })
                const cEmbed = new Discord.MessageEmbed()
                    .setTitle("Console")
                    .setDescription(finalData.join("\n") || "No Data")
                    .setColor("BLUE");
                return message.channel.send({ embeds: [cEmbed] });
            });
        },
        error: () => {
            fs.readFile("/home/ZERO/.pm2/logs/Bot-error.log", "utf8", (err, data) => {
                if (err) return message.channel.send("Error!");
                let Data = data.split("\n");
                let finalData = [];
                for (let i = Data.length - 1; i >= 0; i--) {
                    if (Data.slice(i, Data.length - 1).join("\n").length > 1950) {
                        Data = Data.slice(i + 1, Data.length - 1);
                        break;
                    }
                    if (i == 0) {
                        break;
                    }
                }
                Data.forEach(data => {
                    if (data.startsWith("    ")) finalData.push("> " + data.slice(4).match(/.{1,65}/g).join("\n> "));
                    else finalData.push(data);
                })
                const cEmbed = new Discord.MessageEmbed()
                    .setTitle("Errors")
                    .setDescription(finalData.join("\n") || "No Data")
                    .setColor("BLUE");
                return message.channel.send({ embeds: [cEmbed] });
            });
        }
    };
    let option = args[0];
    if (!option) option = "console";
    if (!Object.keys(optionsObj).includes(option)) return message.channel.send("`0rcon [console(default, optional)|clear|error]`");
    return optionsObj[option.toLowerCase()]();
};

module.exports.config = {
    name: "console",
    en: {
        name: "console",
        usage: "- [console(default)|clear|error]",
        description: "Allows viewing of the console from discord."
    },
    ko: {
        name: "콘솔",
        usage: "- [console(기본)|clear|error]",
        description: "디스코드에 콘솔을 보여줍니다."
    },
    category: "dev",
    aliases: ["rcon", "console", "콘솔"],
    permissions: 2
};
