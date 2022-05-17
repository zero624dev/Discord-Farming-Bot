module.exports.findUser = ({ message, client }, arg) => {
    let userToParse = arg, finalID = 0;
    if (!userToParse) {
        return client.users.cache.get(finalID);
    } else {
        if (userToParse.startsWith("<@") && userToParse.endsWith(">")) {
            userToParse = userToParse.slice(2, -1);
            if (isNaN(userToParse.charAt(0))) finalID = userToParse.slice(1);
        }
        const idMember = message.guild.members.cache.get(userToParse);
        if (!idMember) {
            message.guild.members.cache.each(member => {
                if ((member.displayName.toLowerCase().includes(userToParse.toLowerCase()) || member.user.username.toLowerCase().includes(userToParse.toLowerCase())) && finalID == 0) {
                    finalID = member.id;
                } else if (member.displayName.toLowerCase().includes(userToParse.toLowerCase()) && finalID == 0) {
                    finalID = member.id;
                }
            });
        } else return client.users.cache.get(userToParse);
    }
    return client.users.cache.get(finalID);
};
module.exports.findChannel = ({ message, client }, arg) => {
    let userToParse = arg, finalID = 0;
    if (!userToParse) {
        return client.channels.cache.get(finalID);
    } else {
        if (userToParse.startsWith("<#") && userToParse.endsWith(">")) {
            userToParse = userToParse.slice(2, -1);
            if (isNaN(userToParse.charAt(0))) finalID = userToParse.slice(1);
        }
        const idMember = message.guild.members.cache.get(userToParse);
        if (!idMember) {
            message.guild.channels.cache.each(channel => {
                if (channel.name.toLowerCase().includes(userToParse.toLowerCase()) && finalID == 0) {
                    finalID = channel.id;
                }
            });
        } else return client.channels.cache.get(userToParse);
    }
    return client.channels.cache.get(finalID);
}

module.exports.getUserPermit = ({ config, message }, userid) => {
    let permit = 0;
    userid = userid || message.author.id;
    if (userid == "532239959281893397") permit = 3;
    else if (config.developers_id.includes(userid)) permit = 2;
    else if (config.tester.includes(userid)) permit = 1;
    return permit;
}

module.exports.getPrefix = ({ db, config, message }) => {
    return db.get(`config.${message.guild.id}.prefix`) || config.prefix;
};

module.exports.getLang = ({ db, message }) => {
    return db.get(`config.${message.guild.id}.language`) || message.guild.preferredLocale == "ko" ? "ko" : "en";
};

module.exports.loadCMD = async ({ client, fs, lines, Discord, dirname, importFresh }) => {
    client.category = new Discord.Collection();
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    let failedCmdsArr = [], success = 0, total = 0;
    fs.readdirSync(dirname + "/commands/").forEach(dir => {
        let jsfile = fs.readdirSync(dirname + "/commands/" + dir).filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) return console.log("[LOGS] Couldn't Find Commands!");
        //commands[dir] = jsfile;
        lines.maincode = fs.readFileSync(dirname + "/FarmingBot.js").toString().split("\n").length;
        jsfile.forEach(filename => {
            let cmdname = filename.toString().replace(".js", "");
            total++;
            try {
                let pull = importFresh(`${dirname}/commands/${dir}/${filename}`);
                fs.readFile(`${dirname}/commands/${dir}/${filename}`, function (err, data) {
                    lines[cmdname] = data.toString().split("\n").length;
                });
                client.category.set(cmdname, dir)
                client.commands.set(cmdname, pull);
                pull.config.aliases.forEach(alias => {
                    client.aliases.set(alias, cmdname);
                });
                success++;
            } catch (e) {
                return failedCmdsArr.push(cmdname);
            }
        });
    });
    return { total, success, failedCmdsArr };
};

module.exports.nwc = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.random = (min, max) => {
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
};

module.exports.randomChance = (num) => {
    var Chance = Math.floor(Math.random() * 99) <= num;
    return Chance;
};

module.exports.presence = ({ client }) => {
    const arr = Array.from(client.commands.keys());
    client.user.setPresence({
        activity: {
            name: `!${arr[this.random(0, arr.length - 1)]}`,
            type: "LISTENING"
        },
        status: "online"
    });
}

module.exports.countLines = function (p, filePath, callback) {
    let i;
    let count = 0;
    p.fs.createReadStream(filePath)
        .on('error', e => callback(e))
        .on('data', chunk => {
            for (i = 0; i < chunk.length; ++i)
                if (chunk[i] == 10) count++;
        })
        .on('end', () => callback(null, count));
};

module.exports.autoUpdater = ({ config, fs, dirname }) => {
    const date = new Date();
    let y = date.getUTCFullYear().toString(),
        m = (date.getUTCMonth() + 1).toString(),
        d = date.getUTCDate().toString();
    m = m.length == 1 ? `0${m}` : m;
    const ls = config.version.split(".");
    config.version = ls[0] == y && ls[1] == m && ls[2].split("z")[0] == d ? `${y}.${m}.${d}z${Number(ls[2].split("z")[1]) + 1}` : `${y}.${m}.${d}z0`
    fs.writeFileSync(dirname + "/config.json", JSON.stringify(config, null, 2));
    return config.version;
};