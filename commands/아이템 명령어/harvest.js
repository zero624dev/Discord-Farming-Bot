module.exports.run = ({ message, db, Discord, items, fcs: { random } }) => {
    const user = db.get(`farm.user.${message.author.id}`);
    if (!user) return message.channel.send("`please go to tutorial`");
    const now = Date.now(),
        crops = user.farm.used,
        inven = user.inventory;
    let count = 0;
    for (let i = 0; i < crops.length; i++) {
        var item = items[crops[i].name];
        if (now - crops[i].time > item.time * 60000) {
            let amount;
            if (item.harvest.amount.startsWith("i")) amount = Number(item.harvest.amount.slice(1));
            if (item.harvest.amount.startsWith("r")) {
                const nums = item.harvest.amount.slice(1).split("-");
                amount = random(Number(nums[0]), Number(nums[1]));
            }
            inven[item.harvest.name] ? inven[item.harvest.name] += amount : inven[item.harvest.name] = amount;
            crops.splice(i, 1);
            count += amount;
            i--;
        }
    }
    db.set(`farm.user.${message.author.id}`, user);
    const text = message.guild.region == "south-korea" ? `${count}개의 작물을 수확했습니다.` : `${count} crops are harvested`;
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(text)
        .setColor("BLUE")
        .setFooter("Farming Game | ZeroBot");
    message.channel.send({ embeds: [embed] });
};

module.exports.config = {
    name: "harvest",
    en: {
        name: "harvest",
        usage: "-",
        description: "Harvest"
    },
    ko: {
        name: "수확",
        usage: "-",
        description: "다 자란 작물을 수확합니다."
    },
    category: "fun",
    aliases: ["수확"]
};