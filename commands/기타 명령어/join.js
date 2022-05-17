module.exports.run = async ({ message, db, Discord }) => {
    if (!db.get(`farm.user.${message.author.id}`)) {
        let text = message.guild.region == "south-korea" ? "처음이시네요.\n계정을 추가하겠습니다." : "You are the first time.\nI'll create your account.";
        make_Account();
        const embed = new Discord.MessageEmbed()
            .setDescription(text)
            .setColor("BLUE")
            .setFooter("Farming Game");
        message.channel.send({ embeds: [embed] });
    } else {
        const embed = new Discord.MessageEmbed()
            .setDescription("이미 게임에 가입돼있습니다.")
            .setColor("BLUE")
            .setFooter("Farming Game");
        message.channel.send({ embeds: [embed] });
    }

    function make_Account() {
        const json = {
            money: 120, //코인
            inventory: {}, //인벤토리
            farm: {
                used: [], //심어진 작물 {name: 이름, time: 심은 날짜}
                count: 1 //경작지 갯수
            },
            field: [] //다른 땅
        }
        db.set(`farm.user.${message.author.id}`, json);
    }
};

module.exports.config = {
    name: "join",
    en: {
        name: "join",
        usage: "-",
        description: "Participate in the game."
    },
    ko: {
        name: "참가",
        usage: "-",
        description: "게임에 참가합니다."
    },
    aliases: ["join", "참가"]
};