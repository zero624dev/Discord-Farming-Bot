module.exports.run = ({ client, moment, Discord, message, config, lines }) => {
    const curTime = Date.now(),
        duration = moment
            .duration(client.uptime)
            .format(" D [days], H [hours], m [minutes], s [seconds]"),
        nickname = message.guild.members.cache.get(client.user.id).nickname;
    let Lines = 0;
    for (var key in lines) {
        Lines += lines[key];
    }
    const embed = new Discord.MessageEmbed()
        //.setAuthor("bot's status", client.user.avatarURL())
        .setTitle(`${client.user.username} ${config.version} ${nickname ? `| ${nickname}` : "" }`)
        .setDescription(`Dev by ${client.users.cache.get("532239959281893397").tag}`)
        .addField("Ping", `\`${curTime - message.createdTimestamp}ms\``, true)
        .addField("Uptime", `\`${duration}\``, true)
        .addField("Since", `\`2020.11.30\``, true)
        .addField("Servers", `\`${client.guilds.cache.size}\``, true)
        .addField("Users", `\`${client.users.cache.size}\``, true)
        .addField("Written Lines", `\`${Lines.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} lines of code\``, true)
        .setFooter("Running on rasberry pi 4B")
        .setColor("BLUE")
        .setTimestamp();
    message.channel.send({
        embeds: [embed]
    });
};

module.exports.config = {
    name: "bot",
    en: {
        name: "bot",
        usage: "-",
        description: "Shows this bot's uptime, ping and version."
    },
    ko: {
        name: "봇",
        usage: "-",
        description: "이 봇의 정보를 보여줍니다."
    },
    category: "utils",
    aliases: ["uptime", "ping", "version", "ver", "봇"]
};