module.exports.run = ({ message, db, Discord, fcs: { random } }) => {
    const KST = new Date(Date.now() + 9 * 60 * 60 * 1000)
    const date = `${KST.getUTCFullYear()}-${KST.getUTCMonth() + 1}-${KST.getUTCDate()}`
    const user = db.get(`farm.user.${message.author.id}`);
    if (!user) return message.channel.send("`please go to tutorial`");
    if (!user.comp || user.comp != date) {
        const randReward = random(50, user.money > 10000 ? user.money / 10 : 250), first = user.money;
        user.comp = date;
        user.money += randReward;
        db.set(`farm.user.${message.author.id}`, user);
        const embed = new Discord.MessageEmbed()
            .setTitle(`출석 체크`)
            .setDescription(`출첵 보상으로 ${randReward}원을 받았습니다. \n> ${first} + ${randReward} => ${user.money}`)
            .setColor("BLUE")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] })
    } else {
        message.channel.send("오늘 보상은 이미 받았습니다.");
    }
};

module.exports.config = {
    name: "comp",
    aliases: ["comp", "출석", "출첵"],
    en: {
        name: "comp",
        usage: "-",
        description: "Gets some money"
    },
    ko: {
        name: "출석",
        usage: "-",
        description: "출석 보상을 받습니다."
    },
    category: "fun"
};