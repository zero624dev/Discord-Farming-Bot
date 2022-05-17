module.exports.run = p => {
    const { args, importFresh, message, dirname, client } = p;
    if (!args[0]) return;
    let cmd = args[0];
    p.args = args.slice(1);
    try {
        if (!client.commands.get(cmd)) cmd = client.aliases.get(cmd);
        //(client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))).run(p);
        importFresh(`${dirname}/commands/${client.category.get(cmd)}/${cmd}.js`).run(p);
    } catch (err) {
        let text = "";
        text.length > 1950 ? text = text.slice(0, 1950) : text = text;
        console.log(err.toString().slice(0, 1950));
        return message.channel.send(`\`${err.toString().slice(0, 1950)}\``);
    }
};

module.exports.config = {
    name: "debug",
    en: {
        name: "debug",
        usage: "- [command_file_name]",
        description: "Debugging the file."
    },
    ko: {
        name: "디버그",
        usage: "- [명령어_파일_이름]",
        description: "파일을 디버깅합니다."
    },
    category: "dev",
    aliases: ["debug", "디버그"],
    permissions: 2
};