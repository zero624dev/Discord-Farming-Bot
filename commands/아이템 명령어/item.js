module.exports.run = ({ message, db, items, args, Discord }) => {
    const item = items[db.get(`farm.shop.${args[0][0]}.${args[0].slice(1)}`)] || items[args.join("_").toLowerCase()];
    if (!item) {
        const embed = new Discord.MessageEmbed()
            .setDescription("**ITEM NOT FOUND**")
            .setColor("RED")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${item.name}`)
            .setDescription(`\`${item.description(message)}\``)
            .setImage(item.img || "https://cdn.discordapp.com/attachments/716378506019471433/740121686682370118/image-not-found-scaled-1150x647.png")
            .setColor("BLUE")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] })
    }
};

module.exports.config = {
    name: "item",
    en: {
        name: "item",
        usage: "- [item_name|item_code]",
        description: "Shows item information"
    },
    ko: {
        name: "아이템",
        usage: "- [이름|코드]",
        description: "아이템의 정보를 보여줍니다."
    },
    category: "fun",
    aliases: ["아이템"]
};