module.exports.run = ({ message, db, findUser, args, Discord, client, fcs: { nwc }, getUserPermit }) => {
    const member = findUser(args.join(" ")) || message.author,
        permitTxt = ["User", "Beta Tester", "Developer", "Owner"],
        permit = getUserPermit(member.id);
    const data = db.get("farm.user");
    const IDs = Object.keys(data).filter(f => client.users.cache.get(f)).sort((a, b) => data[b].money - data[a].money);
    if (!data[member.id]) return message.channel.send("`게임에 가입해주세요.`");
    const embed = new Discord.MessageEmbed()
        .setTitle(`${member.tag}님의 프로필`)
        .addField("봇 사용 권한", `> ${permit} [${permitTxt[permit]}]`, true)
        .addField("자산", `> ${nwc(data[member.id].money)}`, true)
        .addField("자산 순위", `> ${IDs.indexOf(member.id) + 1}위 (서버 ${IDs.filter(f => message.guild.members.cache.get(f)).indexOf(member.id) + 1}위)`, true)
        .setThumbnail(member.avatarURL())
        .setColor("BLUE")
        .setFooter("Farming Game");
    message.channel.send({ embeds: [embed] });
};

module.exports.config = {
    name: "profile",
    en: {
        name: "profile",
        usage: "- [username](optional)",
        description: "Shows user's profile."
    },
    ko: {
        name: "프로필",
        usage: "- [유저네임](선택사항)",
        description: "유저의 프로필을 보여줍니다."
    },
    aliases: ["profile", "프로필"]
};