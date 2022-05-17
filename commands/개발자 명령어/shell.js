module.exports.run = ({ Discord, message, args, exec }) => {
    const cmd = args.join(" ");
    if (!cmd) return message.channel.send("Error: Missing [cmd] -> `.shell [cmd]`");
    let status = "";
    let response = "";
    const wEmbed = new Discord.MessageEmbed()
        .setTitle("Command Shell (Running)")
        .setDescription("Please Wait...")
        .setColor("RED");
    message.channel.send({ embeds: [wEmbed] }).then(msg => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                status = "Error";
                response = `${error.message}`;
            }
            if (stderr) {
                status = "Error";
                response = `${stderr}`;
            }
            status = "Success";
            response = `${stdout}`;
            const newData = response.split("\n");
            let finalData = "";
            for (let i = newData.length - 1; i >= 0; i--) {
                if (newData.slice(i, newData.length - 1).join("\n").length > 1950) {
                    finalData = newData.slice(i + 1, newData.length - 1).join("\n");
                    break;
                }
                if (i == 0) {
                    finalData = newData.join("\n");
                    break;
                }
            }
            const eEmbed = new Discord.MessageEmbed()
                .setTitle(`Command Shell (${status})`)
                .setDescription(finalData)
                .setColor("BLUE");
            return msg.edit({ embeds: [eEmbed] });
        });
    });
};

module.exports.config = {
    name: "shell",
    en: {
        name: "shell",
        usage: "- [cmd]",
        description: "Runs Shell command."
    },
    ko: {
        name: "쉘",
        usage: "- [명령어]",
        description: "쉘 명령어를 실행합니다."
    },
    category: "dev",
    aliases: ["shell", "쉘"],
    permissions: 3
};