module.exports.run = ({ message, db, items, args, Discord }) => {
    const { inventory, field } = db.get(`farm.user.${message.author.id}`);
    if (!inventory) return message.channel.send("`please go to tutorial`");
    let itemName = db.get(`farm.shop.${args[0][0]}.${args[0].slice(1)}`) || Object.keys(inventory)[args[0]],
        num, fieldNum;
    if (!itemName) {
        const last = args.pop();
        const snd = args.pop();
        if (!isNaN(snd)) {
            num = Math.floor(Number(snd));
            if (!isNaN(last)) {
                fieldNum = Math.floor(Number(last));
            } else {
                return message.channel.send("0graze [itemName|itemCode] [amount] [fieldNumber]")
            }
        } else {
            args.push(snd);
            if (!isNaN(last)) {
                fieldNum = Math.floor(Number(last));
            } else {
                num = 1;
                args.push(last);
            }
        }
        itemName = args.join("_").toLowerCase();
    } else {
        num = Math.floor(Number(args[1])) || 1;
        fieldNum = !isNaN(args[2]) ? args[2] : null;
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
        } else {
            if (item.type != "entity") return message.channel.send(message.guild.region == "south-korea" ? `엔티티가 아닙니다.` : `It's not entity`)
            if (!field[0]) return message.channel.send(message.guild.region == "south-korea" ? "`소유한 사육장이 없습니다.`" : "`You don't own a breeding ground.`");
            if (!fieldNum) {
                const originNum = num;
                let n, start, end;
                for (n = 0; n < field.length; n++) {
                    if (num == 0) break
                    if (field[n].animals.length != 10) {
                        if (isNaN(start) && !start) start = n;
                        else end = n;
                        let used;
                        if (10 - field[n].animals.length < num)
                            used = 10 - field[n].animals.length
                        if (inventory[itemName] == (used || num))
                            delete inventory[itemName];
                        else
                            inventory[itemName] -= (used || num);
                        for (let i = 0; i < (used || num); i++) {
                            field[n].animals.push({ name: itemName, time: Date.now() })
                        }
                        if (used) num -= used;
                        else num = 0;
                    }
                }
                //if (n == field.length) return message.channel.send(message.guild.region == "south-korea" ? "`남는 자리가 없습니다.`" : "`There's no empty position.`" + " `(10 MAX)`");
                db.set(`farm.user.${message.author.id}.inventory`, inventory);
                db.set(`farm.user.${message.author.id}.field`, field);
                const embed = new Discord.MessageEmbed()
                    .setDescription(message.guild.region == "south-korea" ? `${itemName} ${originNum - num}마리를 ${start + 1}${!isNaN(end) || end ? `-${end + 1}` : ""}번 땅에 풀었습니다.` : `Placed ${originNum - num} ${item.name} in ${start + 1}${!isNaN(end) || end ? `-${end + 1}` : ""}th field.`)
                    .setColor("BLUE")
                    .setFooter("Farming Game | ZeroBot");
                message.channel.send({ embeds: [embed] });
            } else {
                let used;
                if (10 - field[fieldNum - 1].animals.length < num) {
                    used = 10 - field[fieldNum - 1].animals.length
                }
                if (inventory[itemName] == (used || num))
                    db.delete(`farm.user.${message.author.id}.inventory.${itemName}`);
                else
                    db.subtract(`farm.user.${message.author.id}.inventory.${itemName}`, (used || num));
                for (let i = 0; i < (used || num); i++) {
                    field[fieldNum - 1].animals.push({ name: itemName, time: Date.now() })
                }
                db.set(`farm.user.${message.author.id}.field`, field);
                const embed = new Discord.MessageEmbed()
                    .setDescription(message.guild.region == "south-korea" ? `${itemName} ${used || num}마리를 ${fieldNum}번 땅에 풀었습니다.` : `Placed ${used || num} ${item.name} in ${fieldNum}th field.`)
                    .setColor("BLUE")
                    .setFooter("Farming Game | ZeroBot");
                message.channel.send({ embeds: [embed] });
            }
        }
    }
};

module.exports.config = {
    name: "graze",
    en: {
        name: "graze",
        usage: "- [itemName|itemCode] [amount](optional) [fieldNumber](optional)",
        description: "Grazing animals"
    },
    ko: {
        name: "방목",
        usage: "- [이름|코드] [갯수](선택사항) [필드번호](선택사항)",
        description: "동물을 방목합니다."
    },
    category: "fun",
    aliases: ["graze", "방목", "방축"]
};