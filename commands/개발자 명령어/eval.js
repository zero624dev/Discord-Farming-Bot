module.exports.run = async p => {
    const { args, message } = p;
    try {
        const code = args.join(" ");
        let evaled = await eval(code);

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        message.channel.send(
            `${evaled
                .toString()
                .replace("Promise { <pending> }", "Young Bot")
                .slice(0, 1950)}\n\n...`, {
            code: "xl"
        }
        );
    } catch (err) {
        message.channel.send(
            `\`\`\`${err.toString().slice(0, 1950)}\n\n...\`\`\``
        );
    }
};

module.exports.config = {
    name: "eval",
    en: {
        name: "eval",
        usage: "- [code]",
        description: "Runs the code(js)."
    },
    ko: {
        name: "eval",
        usage: "- [코드]",
        description: "코드(js)를 실행합니다."
    },
    category: "dev",
    aliases: ["eval"],
    permissions: 3
};