module.exports.run = ({ message, db, items, args, Discord, findUser, fcs: { nwc } }) => {
    if (isNaN(args[0])) return message.channel.send("`0give [amount] [user]`")
    const user = db.get(`farm.user.${message.author.id}`),
        money = Math.floor(Number(args[0])),
        member = findUser(args.slice(1).join(" ")),
        toUser = db.get(`farm.user.${member ? member.id : 0}`);
    if (money < 0) return message.channel.send("Please enter a positive number.");
    if (!user) return message.channel.send("`Please go to tutorial`");
    if (!toUser) return message.channel.send("`User does not exist`");
    if (user.money >= money) {
        db.subtract(`farm.user.${message.author.id}.money`, money);
        db.add(`farm.user.${member.id}.money`, money);
        const embed = new Discord.MessageEmbed()
            .setDescription(`You gave ${member.username} ${nwc(money)} money `)
            .setColor("BLUE")
            .setFooter(`${nwc(user.money)} - ${nwc(money)} => ${nwc(user.money - money)}`);
        message.channel.send({ embeds: [embed] });
    } else {
        return message.channel.send(`\`You have only ${nwc(user.money)}\``);
    }
};

module.exports.config = {
    name: "give",
    en: {
        name: "give",
        usage: "-",
        description: "None"
    },
    ko: {
        name: "송금",
        usage: "-",
        description: "없음"
    },
    category: "fun",
    aliases: ["송금"]
};