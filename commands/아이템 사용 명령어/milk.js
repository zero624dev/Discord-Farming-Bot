module.exports.run = ({ message, db, items, args, Discord, fcs: { random } }) => {
    if (isNaN(args[0])) return message.channel.send("`0give [num] [entity|all]`")
    const { inventory, field } = db.get(`farm.user.${message.author.id}`);
    const animals = field[args[0] - 1].animals
    if (!inventory) return message.channel.send("`please go to tutorial`");
    if (!field[args[0] - 1]) return message.channel.send(`\`You don't have ${args[0]}th field\``);
    if (!inventory.bucket) return message.channel.send("`You don't have bucket`");
    for (let i = 0; i < animals.length; i++) {
        let item = items[animals[i].name]
        if (item.become && (item.become.time - (Date.now() - animals[i].time) / 60000).toFixed(1) <= 0) {
            animals[i] = { name: item.become.name, time: animals[i].time + 1200000 }
        }
    }
    if (args[1] == "all") {
        return message.channel.send("soon:tm:");
        let text = [], subtract = 0;
        const cur = inventory.sword.durability;
        for (let i = 0; i < animals.length; i++) {
            subtract++;
            inventory.sword.durability--;
            if (inventory.sword.durability <= 0) {
                inventory.sword.amount--;
                inventory.sword.durability = items["sword"].durability;
                if (inventory.sword.amount == 0) {
                    delete inventory.sword.amount;
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
        }
        db.set(`farm.user.${message.author.id}.field.${args[0] - 1}.animals`, []);
        db.set(`farm.user.${message.author.id}.inventory`, inventory);
        if (!text[0]) text.push(`no items`)
        if (cur >= subtract) text.push(`> Durability: \`${cur} - ${subtract} => ${cur - subtract}\``)
        else text.push(`>>> first shears is broken \n second shears: \`${items["shears"].durability} - ${subtract - cur} => ${items["shears"].durability + cur - subtract}\``)
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
    name: "milk",
    en: {
        name: "milk",
        usage: "- [num] [entity|all]",
        description: "Milk a cow in [num]th field"
    },
    ko: {
        name: "착유",
        usage: "- [번호] [엔티티|all]",
        description: "[번호]번 농장에 소를 착유합니다."
    },
    aliases: ["milk", "착유"]
};