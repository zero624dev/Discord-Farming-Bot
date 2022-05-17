module.exports.run = ({ args, message, Discord, request }) => {
    request({
        method: "GET",
        url: `https://opentdb.com/api.php?amount=1`
    }, (err, response, body) => {
        const resJSON = JSON.parse(body).results[0];
        const num = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        let answers = resJSON.incorrect_answers;
        answers.push(resJSON.correct_answer);
        answers = shuffle(answers);
        const embed = new Discord.MessageEmbed()
            .setTitle(resJSON.question)
            //.setDescription()
            .setFooter(`${resJSON.category} | ${resJSON.type} | ${resJSON.question}`)
            .setColor("BLUE");
        if (resJSON.type == "multiple") {
            let text = ""
            for (let i = 0; i < answers.length; i++) {
                text += `${num[i]} ${answers[i]}\n`
            }
            embed.setDescription(text);
        }
        message.channel.send({ embeds: [embed] }).then(async msg => {
            if (resJSON.type == "multiple") {
                await msg.react("1️⃣");
                await msg.react("2️⃣");
                await msg.react("3️⃣");
                await msg.react("4️⃣");
            } else {
                await msg.react("🇴");
                await msg.react("🇽");
            }
            const reactFilter = (reaction, user) => !user.bot;
            const collector = msg.createReactionCollector(reactFilter, {
                time: 30000
            });
            collector.on("collect", async (r, user) => {
                r.users.remove(user.id);
                if (user.id !== message.author.id) return;
                let answer;
                if (resJSON.type == "multiple") {
                    answer = answers[num.indexOf(r.emoji.name)]
                } else {
                    if (r.emoji.name == "🇴") answer = "True";
                    if (r.emoji.name == "🇽") answer = "False";
                }
                if (answer == resJSON.correct_answer) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("정답");
                    msg.edit({ embeds: [embed] })
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("오답");
                    msg.edit({ embeds: [embed] })
                }
                collector.stop();
            });
            collector.on("end", r => {
                msg.reactions.removeAll();
            });
        });
    });
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

module.exports.config = {
    name: "quiz",
    en: {
        name: "quiz",
        usage: "- [category_code](optional)",
        description: "."
    },
    ko: {
        name: "퀴즈",
        usage: "- [카테고리_코드](선택사항)",
        description: "최근 코로나19 상황을 보여줍니다."
    },
    aliases: ["quiz", "퀴즈"]
}