module.exports.run = ({ message, db, Discord, items }) => {
    const user = db.get(`farm.user.${message.author.id}.inventory`);
    let text = "",
        i = 0;
    if (!user) return message.channel.send("`please go to tutorial > 0tutorial`");
    Object.keys(user).forEach(itemName => {
        let item = items[itemName];
        if (item && item.type == "tool" && item.durability) text += `\`${i}\`) ${itemName} (Durability: ${user[itemName].durability}/${item.durability}): ${user[itemName].amount}\n`
        else text += `\`${i}\`) ${itemName}: ${user[itemName]}\n`
        i++
    })
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .addField("Inventory", text || "No Items")
        .setColor("BLUE")
        .setFooter("0use [item_name|shop_code|inven_code] [amount]");
    message.channel.send({ embeds: [embed] });
};

module.exports.config = {
    name: "inventory",
    en: {
        name: "inventory",
        usage: "-",
        description: "Shows your inventory"
    },
    ko: {
        name: "인벤토리",
        usage: "-",
        description: "자신의 인벤토리를 확인합니다."
    },
    category: "fun",
    aliases: ["inv", "인벤", "인벤토리"]
};