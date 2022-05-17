module.exports.run = ({ message, db, args, Discord, items }) => {
    const user = db.get(`farm.user.${message.author.id}`);
    if (!user) return message.channel.send("`please go to tutorial`");
    if (!args[0]) return message.channel.send("`Usage: 0buy [shop_code] [amount]`")
    let itemCode = db.get(`farm.shop.${args[0][0]}.${args[0].slice(1)}`) || Object.keys(user.inventory)[args[0]],
        amount;
    if (!itemCode) {
        const last = args.pop();
        if (!isNaN(last)) {
            amount = Math.floor(Number(last));
        } else {
            amount = 1;
            args.push(last);
        }
        itemCode = args.join("_").toLowerCase();
    } else {
        amount = Math.floor(Number(args[1])) || 1;
    }
    if (amount < 0) return message.channel.send("Please enter a positive number.");
    const item = items[itemCode];
    if (!item) {
        const embed = new Discord.MessageEmbed()
            .setDescription("**ITEM NOT FOUND**")
            .setColor("RED")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else {
        if (user.money < amount * item.buy) {
            const canBuy = Math.floor(user.money / item.buy);
            let text = "";
            if (canBuy == 0) {
                text = message.guild.region == "south-korea" ? `돈이 부족합니다.` : `Not enough money.`;
                const embed = new Discord.MessageEmbed()
                    .setDescription(text)
                    .setColor("RED")
                    .setFooter("Farming Game | ZeroBot");
                return message.channel.send({ embeds: [embed] });
            }
            if (item.type == "field") {
                if (user.field.length + amount > 5) return message.channel.send("`5 MAX`");
                for (let i = 0; i < canBuy; i++)
                    db.push(`farm.user.${message.author.id}.field`, { animals: [], items: [], name: itemCode })
                text = message.guild.region == "south-korea" ? "구매했습니다." : "Purchased";
            } else if (item.type == "tool") {
                if (user.inventory[itemCode]) {
                    if (user.inventory[itemCode].durability) db.add(`farm.user.${message.author.id}.inventory.${itemCode}.amount`, canBuy);
                    else db.add(`farm.user.${message.author.id}.inventory.${itemCode}`, canBuy);
                } else {
                    db.set(`farm.user.${message.author.id}.inventory.${itemCode}`, item.durability ? { amount: canBuy, durability: item.durability } : canBuy);
                }
            } else {
                db.subtract(`farm.user.${message.author.id}.money`, item.buy * canBuy);
                db.add(`farm.user.${message.author.id}.inventory.${itemCode}`, canBuy);
            }
            text = message.guild.region == "south-korea" ? `돈이 부족하여 ${canBuy}개 구매했습니다.` : `purchased ${canBuy} due to lack of money.`;
            const embed = new Discord.MessageEmbed()
                .setDescription(text)
                .setColor("BLUE")
                .setFooter(`${user.money} - ${item.buy}(${canBuy}) => ${user.money - item.buy * canBuy}`);
            message.channel.send({ embeds: [embed] });
        } else {
            let text = "";
            db.subtract(`farm.user.${message.author.id}.money`, item.buy * amount);
            if (item.type == "field") {
                if (user.field.length + amount > 5) return message.channel.send("`5 MAX`");
                for (let i = 0; i < amount; i++)
                    db.push(`farm.user.${message.author.id}.field`, { animals: [], items: [], name: itemCode })
            } else if (item.type == "tool") {
                if (user.inventory[itemCode]) {
                    if (user.inventory[itemCode].durability) db.add(`farm.user.${message.author.id}.inventory.${itemCode}.amount`, amount);
                    else db.add(`farm.user.${message.author.id}.inventory.${itemCode}`, amount);
                } else {
                    db.set(`farm.user.${message.author.id}.inventory.${itemCode}`, item.durability ? { amount, durability: item.durability } : amount);
                }
                /*db.add(`farm.user.${message.author.id}.money`, item.buy * amount);
                return message.channel.send("soon:tm:");*/
            } else {
                db.add(`farm.user.${message.author.id}.inventory.${itemCode}`, amount);
            }
            text = message.guild.region == "south-korea" ? "구매했습니다." : "Purchased";
            const embed = new Discord.MessageEmbed()
                .setDescription(text)
                .setColor("BLUE")
                .setFooter(`${user.money} - ${item.buy}(${amount}) => ${user.money - item.buy * amount}`);
            message.channel.send({ embeds: [embed] });
        }
    }
};

module.exports.config = {
    name: "buy",
    aliases: ["구매"],
    en: {
        name: "buy",
        usage: "- [shop_code|name|inv_num] [amount](optional)",
        description: "Buy items"
    },
    ko: {
        name: "구매",
        usage: "- [상점코드|이름|인벤번호] [갯수](선택사항)",
        description: "상점에서 물건을 삽니다."
    },
    category: "fun"
};