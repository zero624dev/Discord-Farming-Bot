const packages = {
    lines: {},
    dirname: __dirname,
    cache: {
        snipe: {},
        editsnipe: {},
        queue: {},
        np: {},
        loop: {}
    }
};

packages.Discord = require("discord.js");
packages.client = new packages.Discord.Client({ intents: 98047 });
packages.config = require("./config.json");
packages.db = require("quick.db");
packages.importFresh = require("import-fresh");
packages.path = require("path");
packages.fs = require("fs");
packages.request = require("request-promise");
packages.cheerio = require("cheerio");
packages.moment = require("moment");
require("moment-duration-format");
packages.perf = require("execution-time")();
packages.sysinfo = require('systeminformation');
packages.exec = require('child_process').exec;
packages.Canvas = require("canvas");
packages.got = require('got');
packages.fcs = require("./modules/functions.js");
packages.findUser = arg => packages.fcs.findUser(packages, arg);
packages.findChannel = arg => packages.fcs.findChannel(packages, arg);
packages.getLang = () => packages.fcs.getLang(packages);
packages.getPrefix = () => packages.fcs.getPrefix(packages);
//packages.isDev = () => packages.fcs.isDev(packages);
//packages.isWhitelist = () => packages.fcs.isWhitelist(packages);6
packages.getUserPermit = (user) => packages.fcs.getUserPermit(packages, user);
packages.items = require("./modules/items.js");

const { client, Discord, config, fcs, db, fs } = packages;

//start script
client.on("ready", async () => {
    console.log("Bot Online");
    if (db.get("restart.is")) {
        client.channels.cache.get(db.get("restart.channel")).send(`Restarted (${((Date.now() - db.get("restart.time")) / 1000).toFixed(1)}s)`);
        db.set("restart.is", false);
    }
    client.user.setPresence({
        activity: {
            name: "Restarted!",
            type: "PLAYING"
        },
        status: "online"
    });
    fcs.loadCMD(packages);
    let num = 0;
    setInterval(() => {
        var act = config.activities[num];
        if (num >= config.activities.length - 1) num = 0;
        else num++;
        client.user.setPresence({
            activity: {
                name: act.name
                    .replace(/\[users\]/g, client.users.cache.size)
                    .replace(/\[guilds\]/g, client.guilds.cache.size)
                    .replace(/\[prefix\]/g, config.prefix),
                type: act.type
            },
            status: "online"
        });
    }, 5000);
});

// Message event
client.on("messageCreate", async message => {
    if (message.author.bot || message.channel.type == "dm")
        return;
    let prefix = db.get(`config.${message.guild.id}.prefix`) || config.prefix
    packages.message = message;
    if (
        message.content.startsWith(prefix) &&
        !message.content.includes("!!")
    ) {
        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const command = args.shift().toLowerCase();
        // if ((client.category.get(command) || client.category.get(client.aliases.get(command))) == "game" && packages.getUserPermit() < 2) {
        //     return message.channel.send("점검중");
        // }
        packages.args = args;
        let commandfile =
            client.commands.get(command) ||
            client.commands.get(client.aliases.get(command));
        if (commandfile) {
            const reqArgs = commandfile.config.en.usage.split(" "),
                permit = packages.getUserPermit(),
                permitTxt = ["User", "Beta Tester", "Developer", "Owner"];
            reqArgs.shift();
            let ct = 0;
            reqArgs.forEach(arg => {
                if (!arg.includes("(optional)") && !arg.includes("(default)")) ct++;
            })
            if (commandfile.config.permissions && commandfile.config.permissions > permit) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(packages.getLang() == 'ko' ? "사용 권한 부족" : "Insufficient Permissions")
                    .setDescription(packages.getLang() == 'ko' ? "이 명령어를 사용할 권한이 없습니다." : "You don't have permissions to use that command.")
                    .addField(packages.getLang() == 'ko' ? "유저 권한 레벨" : "Your Permissions", `${permit} [${permitTxt[permit]}]`, false)
                    .addField(packages.getLang() == 'ko' ? "사용 권한 레벨" : "Required Permissions", `${commandfile.config.permissions} [${permitTxt[commandfile.config.permissions]}]`, false)
                    .setColor("RED");
                return message.channel.send({ embeds: [embed] });
            }
            try {
                if (ct > args.length) return message.channel.send(`Error: Missing [command] -> \`${commandfile.config[packages.getLang()].usage.replace("-", packages.getPrefix() + command)}\``);
                commandfile.run(packages);
            } catch (err) {
                console.log(command);
                console.log(err);
                const embed = new Discord.MessageEmbed()
                    .setTitle(packages.getLang() == 'ko' ? "오류" : "ERROR")
                    .setDescription("명령어 실행에 오류가 있습니다.")
                    .setColor("RED")
                    .setFooter(`${packages.getLang() == 'ko' ? "z0피드백 [의견]" : "z0feedback [opinions]"}`);
                message.channel.send({ embeds: [embed] });
            }
        }
    }
});

client.login(config.token);
