module.exports.run = ({ message, db, findUser, args, Discord, fcs: { nwc } }) => {
    const member = findUser(args.join(" ")) || message.author
    const user = db.get(`farm.user.${member.id}`)
    if (!user) return message.channel.send("`please go to tutorial`");
    const text = message.guild.region == "south-korea" ? `돈: ${nwc(user.money)}` : `money: ${nwc(user.money)}`
    const embed = new Discord.MessageEmbed()
        .setAuthor(member.tag, member.avatarURL())
        .setDescription(text)
        .setColor("BLUE")
        .setFooter("Farming Game | ZeroBot");
    message.channel.send({ embeds: [embed] });
};

module.exports.config = {
    name: "money",
    en: {
        name: "money",
        usage: "-",
        description: "Shows your money"
    },
    ko: {
        name: "돈",
        usage: "-",
        description: "자신이 가진돈을 보여줍니다."
    },
    category: "fun",
    aliases: ["돈", "지갑", "wallet"]
};