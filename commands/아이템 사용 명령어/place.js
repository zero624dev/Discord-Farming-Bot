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
            if (item.type != "block") return message.channel.send(message.guild.region == "south-korea" ? `블록이 아닙니다.` : `It's not block`)
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
        }
    }
};

module.exports.config = {
    name: "place",
    en: {
        name: "place",
        usage: "- [item_name|item_code] [amount](optional)",
        description: "Places the block"
    },
    ko: {
        name: "설치",
        usage: "- [이름|코드] [갯수](선택사항)",
        description: "블럭을 설치합니다."
    },
    category: "fun",
    aliases: ["place", "설치"]
};