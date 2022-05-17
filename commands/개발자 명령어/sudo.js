module.exports.run = p => {
    p.message.author = p.findUser(p.args[0]);
    const commandfile = p.client.commands.get(p.args[1]) || p.client.commands.get(p.client.aliases.get(p.args[1])),
        permitTxt = ["User", "Beta Tester", "Developer", "Owner"],
        permit = p.getUserPermit();
    p.args = p.args.slice(2);
    if (!commandfile) return p.message.channel.send("`Command Not Found`");
    if (commandfile.config.permissions && commandfile.config.permissions > permit) {
        const embed = new p.Discord.MessageEmbed()
            .setTitle(p.getLang() == 'ko' ? "사용 권한 부족" : "Insufficient Permissions")
            .setDescription(p.getLang() == 'ko' ? "이 명령어를 사용할 권한이 없습니다." : "You don't have permissions to do that")
            .addField(p.getLang() == 'ko' ? "유저 권한 레벨" : "Your Permissions", `${permit} [${permitTxt[permit]}]`, false)
            .addField(p.getLang() == 'ko' ? "사용 권한 레벨" : "Required Permissions", `${commandfile.config.permissions} [${permitTxt[commandfile.config.permissions]}]`, false)
            .setColor("RED");
        return p.message.channel.send({ embeds: [embed] });
    }
    commandfile.run(p);
};

module.exports.config = {
    name: "sudo",
    en: {
        name: "sudo",
        usage: "- [user] [cmd]",
        description: "Executes [cmd] as [user]."
    },
    ko: {
        name: "sudo",
        usage: "- [유저] [명령어]",
        description: "[유저]로 명령어를 실행합니다."
    },
    category: "dev",
    aliases: ["sudo"],
    permissions: 2
}
