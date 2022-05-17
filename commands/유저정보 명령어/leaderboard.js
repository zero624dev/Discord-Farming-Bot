module.exports.run = ({ message, db, Discord, client, fcs: { nwc } }) => {
    const data = db.get("farm.user");
    const IDs = Object.keys(data).filter(f => /*f != 532239959281893397 &&*/ client.users.cache.get(f)).sort((a, b) => data[b].money - data[a].money);
    const top10 = IDs.slice(0, 10);
    let txt = "", istop = false;
    for (let i = 0; i < top10.length; i++) {
        if (client.users.cache.get(top10[i])) {
            if (top10[i] == message.author.id) {
                istop = true;
                txt += `${i + 1}. **${client.users.cache.get(top10[i]).tag}**: ${nwc(data[top10[i]].money)} **(YOU)**\n`
            } else {
                txt += `${i + 1}. **${client.users.cache.get(top10[i]).tag}**: ${nwc(data[top10[i]].money)}\n`
            }
        } else {
            txt += `${i + 1}. **ERROR**\n`
        }
    }
    if (!istop) {
        txt += `......\n${IDs.indexOf(message.author.id) + 1}. **${message.author.tag}**: ${nwc(data[message.author.id].money)}`
    }
    const embed = new Discord.MessageEmbed()
        .setTitle(`Farming Game Leaderboard`)
        .setDescription(`>>> ${txt}`)
        .setColor("BLUE")
        .setFooter("ZeroBot");
    message.channel.send({ embeds: [embed] });
};

module.exports.config = {
    name: "leaderboard",
    en: {
        name: "leaderboard",
        usage: "-",
        description: "Shows Leaderboard"
    },
    ko: {
        name: "리더보드",
        usage: "-",
        description: "리더보드를 보여줍니다."
    },
    category: "fun",
    aliases: ["leaderboard", "lb", "리더보드"]
};