module.exports.run = ({ message, db, items, args, Discord, fcs: { random } }) => {
    if (isNaN(args[0]) && args[0] != "all") return message.channel.send("`0give [num|all] [entity|all]`")
    const { inventory, field } = db.get(`farm.user.${message.author.id}`);
    if (!inventory) return message.channel.send("`please go to tutorial`");
    if (!field[args[0] - 1] && args[0] != "all") return message.channel.send(`\`You don't have ${args[0]}th field\``);
    if (args[0] == "all" && !field[0]) return message.channel.send(`\`You don't have a field\``);
    if (!inventory.sword) return message.channel.send("`You don't have sword`");
    for (let n = 0; n < field.length; n++) {
        for (let i = 0; i < field[n].animals.length; i++) {
            let item = items[field[n].animals[i].name]
            if (item.become && (item.become.time - (Date.now() - field[n].animals[i].time) / 60000).toFixed(1) <= 0) {
                field[n].animals[i] = { name: item.become.name, time: field[n].animals[i].time + 1200000 }
            }
        }
    }
    if (args[0] == "all") {
        let text = [], subtract = 0;
        const cur = inventory.sword.durability;
        out: for (let n = 0; n < field.length; n++) {
            for (let i = 0; i < field[n].animals.length; i++) {
                subtract++;
                inventory.sword.durability--;
                if (inventory.sword.durability <= 0) {
                    inventory.sword.amount--;
                    inventory.sword.durability = items["sword"].durability;
                    if (inventory.sword.amount == 0) {
                        delete inventory.sword;
                        break out;
                    }
                }
                let item = items[field[n].animals[i].name];
                if (item.drops) {
                    item.drops.forEach(drop => {
                        let amount, isequal;
                        if (drop.amount.startsWith("i")) amount = Number(drop.amount.slice(1));
                        if (drop.amount.startsWith("r")) {
                            const nums = drop.amount.slice(1).split("-");
                            amount = random(Number(nums[0]), Number(nums[1]));
                        }
                        inventory[drop.name] ? inventory[drop.name] += amount : inventory[drop.name] = amount;
                        for (let k = 0; k < text.length; k++) {
                            let texts = text[k].split(" ");
                            if (texts[0] == drop.name) {
                                isequal = true;
                                text[k] = `${texts[0]} x${amount + Number(texts[1].slice(1))}`
                            }
                        }
                        if (!isequal) text.push(`${drop.name} x${amount}`);
                    })
                }
                field[n].animals.splice(i, 1);
                i--;
            }
        }
        db.set(`farm.user.${message.author.id}.field`, field);
        db.set(`farm.user.${message.author.id}.inventory`, inventory);
        if (!text[0]) text.push(`no items`)
        if (cur > subtract) text.push(`> Durability: \`${cur} - ${subtract} => ${cur - subtract}\``);
        else if (cur == subtract) text.push(`>>> Sword is broken`);
        else text.push(`>>> first sword is broken \n second sword: \`${items["sword"].durability} - ${subtract - cur} => ${items["sword"].durability + cur - subtract}\``);
        const embed = new Discord.MessageEmbed()
            .setTitle("Items Picked Up")
            .setDescription(text.join("\n"))
            .setColor("BLUE")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else if (args[1] == "all") {
        const animals = field[args[0] - 1].animals
        let text = [], subtract = 0;
        const cur = inventory.sword.durability;
        for (let i = 0; i < animals.length; i++) {
            subtract++;
            inventory.sword.durability--;
            if (inventory.sword.durability <= 0) {
                inventory.sword.amount--;
                inventory.sword.durability = items["sword"].durability;
                if (inventory.sword.amount == 0) {
                    delete inventory.sword;
                    break;
                }
            }
            let item = items[animals[i].name];
            if (item.drops) {
                item.drops.forEach(drop => {
                    let amount, isequal;
                    if (drop.amount.startsWith("i")) amount = Number(drop.amount.slice(1));
                    if (drop.amount.startsWith("r")) {
                        const nums = drop.amount.slice(1).split("-");
                        amount = random(Number(nums[0]), Number(nums[1]));
                    }
                    inventory[drop.name] ? inventory[drop.name] += amount : inventory[drop.name] = amount;
                    for (let k = 0; k < text.length; k++) {
                        let texts = text[k].split(" ");
                        if (texts[0] == drop.name) {
                            isequal = true;
                            text[k] = `${texts[0]} x${amount + Number(texts[1].slice(1))}`
                        }
                    }
                    if (!isequal) text.push(`${drop.name} x${amount}`);
                })
            }
            animals.splice(i, 1);
            i--;
        }
        db.set(`farm.user.${message.author.id}.field.${args[0] - 1}.animals`, animals);
        db.set(`farm.user.${message.author.id}.inventory`, inventory);
        if (!text[0]) text.push(`no items`)
        if (cur > subtract) text.push(`> Durability: \`${cur} - ${subtract} => ${cur - subtract}\``);
        else if (cur = subtract) text.push(`> Sword is broken`);
        else text.push(`>>> first sword is broken \n second sword: \`${items["sword"].durability} - ${subtract - cur} => ${items["sword"].durability + cur - subtract}\``);
        const embed = new Discord.MessageEmbed()
            .setTitle("Items Picked Up")
            .setDescription(text.join("\n"))
            .setColor("BLUE")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else if (!isNaN(args[1])) {
        const animals = field[args[0] - 1].animals
        let text = [];
        const cur = inventory.sword.durability, num = Number(args[1]);
        inventory.sword.durability--;
        if (inventory.sword.durability <= 0) {
            inventory.sword.amount--;
            inventory.sword.durability = items["sword"].durability;
            if (inventory.sword.amount <= 0) {
                delete inventory.sword;
            }
        }
        let item = items[animals[num].name];
        animals.splice(num, 1);
        if (item.drops) {
            item.drops.forEach(drop => {
                let amount, isequal;
                if (drop.amount.startsWith("i")) amount = Number(drop.amount.slice(1));
                if (drop.amount.startsWith("r")) {
                    const nums = drop.amount.slice(1).split("-");
                    amount = random(Number(nums[0]), Number(nums[1]));
                }
                inventory[drop.name] ? inventory[drop.name] += amount : inventory[drop.name] = amount;
                for (let k = 0; k < text.length; k++) {
                    let texts = text[k].split(" ");
                    if (texts[0] == drop.name) {
                        isequal = true;
                        text[k] = `${texts[0]} x${amount + Number(texts[1].slice(1))}`
                    }
                }
                if (!isequal) text.push(`${drop.name} x${amount}`);
            })
        }
        db.set(`farm.user.${message.author.id}.field.${args[0] - 1}.animals`, animals);
        db.set(`farm.user.${message.author.id}.inventory`, inventory);
        if (!text[0]) text.push(`no items`)
        if (cur > 1) text.push(`> Durability: \`${cur} - 1 => ${cur - 1}\``);
        else text.push(`> Sword is broken`);
        const embed = new Discord.MessageEmbed()
            .setTitle("Items Picked Up")
            .setDescription(text.join("\n"))
            .setColor("BLUE")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else {
        message.channel.send("soon:tm:");
    }
};

module.exports.config = {
    name: "kill",
    en: {
        name: "kill",
        usage: "- [farm_num|all] [name|entity_num|all](optional)",
        description: "Kill a certain entity in [num]th field"
    },
    ko: {
        name: "도축",
        usage: "- [농장번호|all] [이름|엔티티번호|all]",
        description: "[번호]번 농장에 특정 엔티티를 죽입니다."
    },
    aliases: ["kill", "도축"]
};