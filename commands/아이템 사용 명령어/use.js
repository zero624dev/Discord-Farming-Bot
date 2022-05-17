module.exports.run = ({ message, db, items, args, Discord }) => {
    const { inventory, farm, field } = db.get(`farm.user.${message.author.id}`);
    if (!inventory) return message.channel.send("`please go to tutorial`");
    let itemName = db.get(`farm.shop.${args[0][0]}.${args[0].slice(1)}`) || Object.keys(inventory)[args[0]],
        num, fieldNum;
    if (!itemName) {
        const last = args.pop();
        const snd = args.pop();
        if (!isNaN(snd)) {
            num = Math.floor(Number(snd));
        } else {
            num = 1;
            args.push(snd);
        }
        if (!isNaN(last)) {
            fieldNum = Math.floor(Number(last));
        } else {
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
        const cmd = {
            seed: "0plant(=심기)",
            entity: "0graze(=방목)",
            tool: "0kill(=도축) or 0shear(=깎기)",
            block: "0place(=설치)"
        }
        return message.channel.send(cmd[item.type]);
        if (inventory[itemName] < num) {
            message.channel.send(`${inventory[itemName]}개밖에 없음ㅋ`)
        } else {
            if (item.type == "seed") {
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
                    const text = message.guild.region == "south-korea" ? `${itemName}을 심었습니다.` : `Planted ${item.name}.`
                    const embed = new Discord.MessageEmbed()
                        .setDescription(text)
                        .setColor("BLUE")
                        .setFooter("Farming Game | ZeroBot");
                    message.channel.send({ embeds: [embed] });
                }
            } else if (item.type == "block") {
                if (farm.count + num > 24) return message.channel.send("`24 MAX`");
                if (inventory[itemName] == num)
                    db.delete(`farm.user.${message.author.id}.inventory.${itemName}`);
                else
                    db.subtract(`farm.user.${message.author.id}.inventory.${itemName}`, num);
                db.add(`farm.user.${message.author.id}.farm.count`, num);
                const text = message.guild.region == "south-korea" ? `${itemName}을 설치했습니다.` : `Placed ${item.name}.`
                const embed = new Discord.MessageEmbed()
                    .setDescription(text)
                    .setColor("BLUE")
                    .setFooter("Farming Game | ZeroBot");
                message.channel.send({ embeds: [embed] });
            } else if (item.type == "entity") {
                //if (message.author.id != 532239959281893397) return message.channel.send("soon:tm:");
                if (!field[0]) return message.channel.send(message.guild.region == "south-korea" ? "`소유한 사육장이 없습니다.`" : "`You don't own a breeding ground.`");
                let n;
                if (!fieldNum) {
                    for (n = 0; n < field.length; n++) {
                        if (field[n].animals.length + num <= 10) break;
                        if (n == field.length - 1) return message.channel.send(message.guild.region == "south-korea" ? "`남는 자리가 없습니다.`" : "`There's no empty position.`" + " `(10 MAX)`");
                    }
                } else n = fieldNum;
                if (inventory[itemName] == num)
                    db.delete(`farm.user.${message.author.id}.inventory.${itemName}`);
                else
                    db.subtract(`farm.user.${message.author.id}.inventory.${itemName}`, num);
                for (let i = 0; i < num; i++) {
                    field[n].animals.push({ name: itemName, time: Date.now() })
                }
                db.set(`farm.user.${message.author.id}.field`, field);
                const embed = new Discord.MessageEmbed()
                    .setDescription(message.guild.region == "south-korea" ? `${itemName}을 ${n + 1}번 땅에 풀었습니다.` : `Placed ${item.name}.`)
                    .setColor("BLUE")
                    .setFooter("Farming Game | ZeroBot");
                message.channel.send({ embeds: [embed] });
            } else {

            }
        }
    }
};

module.exports.config = {
    name: "use",
    en: {
        name: "use",
        usage: "- [shop_code|name|inv_num] [amount](optional)",
        description: "Use the items"
    },
    ko: {
        name: "사용",
        usage: "- [상점코드|이름|인벤번호] [갯수](선택사항)",
        description: "아이템을 사용합니다."
    },
    category: "fun",
    aliases: ["사용"]
};