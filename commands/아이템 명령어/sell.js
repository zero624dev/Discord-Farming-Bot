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
    if (!itemName && amount == "all") {
        const itemList = Object.keys(inventory);
        let add = 0;
        itemList.forEach(itemName => {
            let item = items[itemName];
            if (item.sell != 0) {
                add += item.sell * inventory[itemName];
                delete inventory[itemName];
            }
        })
        let text = message.guild.region == "south-korea" ? `팔 수 있는 아이템을 모두 판매했습니다.` : `Sold all the items that could be sold.`;
        const embed = new Discord.MessageEmbed()
            .setDescription(text)
            .setColor("BLUE")
            .setFooter(`${money} + ${add} => ${money + add}`);
        message.channel.send({ embeds: [embed] });
        db.add(`farm.user.${message.author.id}.money`, add);
        db.set(`farm.user.${message.author.id}.inventory`, inventory);
    } else if (!item) {
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
        if (item.sell == 0) {
            const embed = new Discord.MessageEmbed()
                .setDescription("**THE ITEM CANNOT BE SOLD**")
                .setColor("RED")
                .setFooter("Farming Game | ZeroBot");
            return message.channel.send({ embeds: [embed] });
        }
        if (amount == "all") {
            let text = message.guild.region == "south-korea" ? `${itemName}을 모두 판매했습니다.` : `Sold all ${itemName}s.`;
            const embed = new Discord.MessageEmbed()
                .setDescription(text)
                .setColor("BLUE")
                .setFooter(`${money} + ${item.sell}(${inventory[itemName]}) => ${money + item.sell * inventory[itemName]}`);
            message.channel.send({ embeds: [embed] });
            db.add(`farm.user.${message.author.id}.money`, item.sell * inventory[itemName]);
            db.delete(`farm.user.${message.author.id}.inventory.${itemName}`);
        } else if (inventory[itemName] < amount) {
            let text = message.guild.region == "south-korea" ? `님 ${inventory[itemName]}개 밖에 없음ㅋ` : `You have only ${inventory[itemName]}`;
            const embed = new Discord.MessageEmbed()
                .setDescription(text)
                .setColor("RED")
                .setFooter("Farming Game | ZeroBot");
            message.channel.send({ embeds: [embed] });
        } else {
            if (amount < 0) return message.channel.send("Please enter a positive number."); else {
                let text = message.guild.region == "south-korea" ? `${itemName}을 ${amount}개 판매했습니다.` : `Sold ${amount} ${amount > 1 ? itemName + "s" : itemName}.`;
                const embed = new Discord.MessageEmbed()
                    .setDescription(text)
                    .setColor("BLUE")
                    .setFooter(`${money} + ${item.sell}(${amount}) => ${money + item.sell * amount}`);
                message.channel.send({ embeds: [embed] });
                db.add(`farm.user.${message.author.id}.money`, item.sell * amount);
                if (inventory[itemName] == amount)
                    db.delete(`farm.user.${message.author.id}.inventory.${itemName}`);
                else
                    db.subtract(`farm.user.${message.author.id}.inventory.${itemName}`, amount);
            }
        }
    }
};

module.exports.config = {
    name: "sell",
    en: {
        name: "sell",
        usage: "- [shop_code] [amount](optional)",
        description: "sell items"
    },
    ko: {
        name: "판매",
        usage: "- [코드] [갯수](선택사항)",
        description: "상점에 물건을 팝니다."
    },
    category: "fun",
    aliases: ["판매"]
};