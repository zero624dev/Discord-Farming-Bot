module.exports.run = ({ message, db, args, Discord, items }) => {
    const { inventory, money } = db.get(`farm.user.${message.author.id}`);
    if (!inventory) return message.channel.send("`please go to tutorial`");
    let itemName = db.get(`farm.shop.${args[0][0]}.${args[0].slice(1)}`) || Object.keys(inventory)[args[0]], amount;
    if (!itemName) {
        const last = args.pop();
        if (!isNaN(last)) {
            amount = Math.floor(Number(last));
        } else if (last == "all") {
            amount = "all"
        } else {
            amount = "all";
            args.push(last);
        }
        itemName = args.join("_").toLowerCase();
    } else {
        amount = Math.floor(Number(args[1])) || "all";
    }
    const item = items[itemName];
    if (!item) {
        const embed = new Discord.MessageEmbed()
            .setDescription("**ITEM NOT FOUND**")
            .setColor("RED")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else if (!inventory[itemName]) {
        const embed = new Discord.MessageEmbed()
            .setDescription("**ITEM NOT FOUND IN YOUR INVENTORY**")
            .setColor("RED")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else {
        if (amount == "all") {
            let text = message.guild.region == "south-korea" ? `${itemName}을 모두 버렸습니다.` : `Threw away all ${itemName}s.`;
            const embed = new Discord.MessageEmbed()
                .setDescription(text)
                .setColor("BLUE")
            message.channel.send({ embeds: [embed] });
            db.delete(`farm.user.${message.author.id}.inventory.${itemName}`);
        } else if ((inventory[itemName].amount || inventory[itemName]) < amount) {
            let text = message.guild.region == "south-korea" ? `님 ${inventory[itemName].amount || inventory[itemName]}개 밖에 없음ㅋ` : `You have only ${inventory[itemName].amount || inventory[itemName]}`;
            const embed = new Discord.MessageEmbed()
                .setDescription(text)
                .setColor("RED")
                .setFooter("Farming Game | ZeroBot");
            message.channel.send({ embeds: [embed] });
        } else {
            if (amount < 0) return message.channel.send("Please enter a positive number.");
            else {
                let text = message.guild.region == "south-korea" ? `${itemName}을 ${amount}개 버렸습니다.` : `Threw away ${amount} ${amount > 1 ? itemName + "s" : itemName}.`;
                const embed = new Discord.MessageEmbed()
                    .setDescription(text)
                    .setColor("BLUE");
                message.channel.send({ embeds: [embed] });
                if (inventory[itemName].amount || inventory[itemName] == amount) {
                    db.delete(`farm.user.${message.author.id}.inventory.${itemName}`);
                } else {
                    if (item.type == "tool")
                        db.subtract(`farm.user.${message.author.id}.inventory.${itemName}.amount`, amount);
                    else
                        db.subtract(`farm.user.${message.author.id}.inventory.${itemName}`, amount);
                }
            }
        }
    }
};

module.exports.config = {
    name: "junk",
    en: {
        name: "junk",
        usage: "- [item] [amount](optional)",
        description: "Junk useless items"
    },
    ko: {
        name: "버리기",
        usage: "- [아이템] [갯수](선택사항)",
        description: "쓸모없는 물거을 버립니다."
    },
    category: "fun",
    aliases: ["junk", "버리기"]
};