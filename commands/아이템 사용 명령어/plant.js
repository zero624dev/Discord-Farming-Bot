module.exports.run = ({ message, db, items, args, Discord }) => {
    const { inventory, farm } = db.get(`farm.user.${message.author.id}`);
    if (!inventory) return message.channel.send("`please go to tutorial`");
    let itemName = db.get(`farm.shop.${args[0][0]}.${args[0].slice(1)}`) || Object.keys(inventory)[args[0]],
        num;
    if (!itemName) {
        const last = args.pop();
        if (!isNaN(last)) {
            num = Math.floor(Number(last));
        } else {
            num = 1;
            args.push(last);
        }
        itemName = args.join("_").toLowerCase();
    } else {
        num = Math.floor(Number(args[1])) || 1;
    }
    if (num < 0) return message.channel.send("Please enter a positive number.");
    const item = items[itemName];
    if (!item) {
        const embed = new Discord.MessageEmbed()
            .setDescription("**ITEM NOT FOUND**")
            .setColor("RED")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else if (!inventory[itemName]) {
        const embed = new Discord.MessageEmbed()
            .setDescription("**HAVE NO THAT ITEM**")
            .setColor("RED")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else {
        if (inventory[itemName] < num) {
            message.channel.send(`${inventory[itemName]}개밖에 없음ㅋ`)
        } else {
            if (item.type != "seed") return message.channel.send(message.guild.region == "south-korea" ? `씨앗이 아닙니다.` : `It's not seed`)
            if (num + farm.used.length > farm.count) {
                const text = message.guild.region == "south-korea" ? `남는 땅이 없습니다` : `NO LEFTOVER LAND`
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**${text}**`)
                    .setColor("RED")
                    .setFooter("Farming Game | ZeroBot");
                message.channel.send({ embeds: [embed] });
            } else {
                if (inventory[itemName] == num)
                    db.delete(`farm.user.${message.author.id}.inventory.${itemName}`);
                else
                    db.subtract(`farm.user.${message.author.id}.inventory.${itemName}`, num);
                let arr = farm.used
                for (let i = 0; i < num; i++) {
                    arr.push({ name: itemName, time: Date.now() })
                }
                db.set(`farm.user.${message.author.id}.farm.used`, arr);
                const text = message.guild.region == "south-korea" ? `${itemName}을 ${num}개 심었습니다.` : `Planted ${num} ${item.name}.`
                const embed = new Discord.MessageEmbed()
                    .setDescription(text)
                    .setColor("BLUE")
                    .setFooter("Farming Game | ZeroBot");
                message.channel.send({ embeds: [embed] });
            }
        }
    }
};

module.exports.config = {
    name: "plant",
    en: {
        name: "plant",
        usage: "- [item_name|item_code] [amount](optional)",
        description: "Plants the seed"
    },
    ko: {
        name: "심기",
        usage: "- [이름|코드] [갯수](선택사항)",
        description: "씨앗을 심습니다."
    },
    category: "fun",
    aliases: ["plant", "심기"]
};