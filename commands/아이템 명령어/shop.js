module.exports.run = ({ message, db, Discord, args, items }) => {
    const ShopName = { c: "Crops", e: "Entities", b: "Blocks", f: "Fields", t: "Tools" }
    if (message.author.id == "532239959281893397" && args[0]) {
        if (args[0] == "add") {
            //message.channel.send("`0shop add [kind][num] [name] [buy] [sell]`")
            var kind = args[1][0],
                num = args[1].slice(1);
            db.set(`farm.shop.${kind}.${num}`, args.slice(2).join("_"))
            message.channel.send(`${ShopName[kind]}[${num}] = ${args.slice(2).join("_")}`);
        } else if (args[0] == "delete") {
            var kind = args[1][0],
                num = args[1].slice(1);
            let data = db.get(`farm.shop.${kind}`);
            message.channel.send(`${ShopName[kind]}[${num}] | ${num} | ${data[num].name}`);
            data.splice(num, 1);
            db.set(`farm.shop.${kind}`, data);
        } else if (args[0] == "menu") {
            if (!args[1]) {

            } else if (args[1].length == 1) {
                let items_text = "";
                const Shop = db.get(`farm.shop.${args[1]}`)
                for (let i = 0; i < Shop.length; i++) {
                    items_text += `\`${args[1]}${i}\`) ${Shop[i].name}: Buy ${Shop[i].buy}, Sell ${Shop[i].sell}\n`;
                }
                const embed = new Discord.MessageEmbed()
                    .addField(`${ShopName[kind]} Shop`, items_text)
                    .setColor("BLUE")
                    .setFooter("0buy [shop_code] [item_count]");
                message.channel.send({ embeds: [embed] })
            } else {
                let kind = args[1][0],
                    num = args[1].slice(1);
                let data = db.get(`farm.shop.${kind}.${num}`)
                message.channel.send(`${ShopName[kind]} | ${num} | ${data.name} | ${data.buy} | ${data.sell}`);
            }
        }
    } else {
        if (!db.get(`farm.user.${message.author.id}`)) return message.channel.send("`please go to tutorial`");
        const embed = new Discord.MessageEmbed()
            .addField("Select Shop", "`c`rop \n`e`ntity \n`t`ool \n`b`lock\n`f`ield \n`c`ancel")
            .setColor("BLUE")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] }).then(msg_ => {
            const collector = new Discord.MessageCollector(
                message.channel,
                m => m.author.id === message.author.id, { time: 30000 }
            );
            collector.on("collect", msg => {
                msg.delete();
                const args_ = msg.content.split(" ");
                if (["c", "crop"].includes(args_[0])) collector.stop("c");
                else if (["e", "entity"].includes(args_[0])) collector.stop("e");
                else if (["t", "tool"].includes(args_[0])) collector.stop("t");
                else if (["b", "block"].includes(args_[0])) collector.stop("b");
                else if (["f", "field"].includes(args_[0])) collector.stop("f");
                else if (["c", "cancel"].includes(args_[0])) collector.stop("canceled");
                else collector.stop("wrong_option")
            });
            collector.on("end", (m, r) => {
                if (r == "time") {
                    const embed = new Discord.MessageEmbed()
                        .setDescription("**NO OPTION SELECTED**")
                        .setColor("RED");
                    msg_.edit({ embeds: [embed] });
                } else if (r == "wrong_option") {
                    const embed = new Discord.MessageEmbed()
                        .setDescription("**WRONG OPTION SELECTED**")
                        .setColor("RED");
                    msg_.edit({ embeds: [embed] });
                } else if (r == "canceled") {
                    const embed = new Discord.MessageEmbed()
                        .setDescription("**CANCELED**")
                        .setColor("BLUE");
                    msg_.edit({ embeds: [embed] });
                } else {
                    shop_details(msg_, r);
                }
            });
        });

        function shop_details(msg_, kind) {
            let items_text = "";
            const Shop = db.get(`farm.shop.${kind}`)
            if (Shop && Shop[0]) {
                for (let i = 0; i < Shop.length; i++) {
                    let { buy, sell } = items[Shop[i]];
                    items_text += `\`${kind}${i}\`) ${Shop[i]}: Buy ${buy}, Sell ${sell}\n`;
                }
            } else {
                items_text = "soon:tm:"
            }
            const embed = new Discord.MessageEmbed()
                .addField(`${ShopName[kind]} Shop`, items_text)
                .setColor("BLUE")
                .setFooter("0buy [shop_code] [amount]");
            msg_.edit({ embeds: [embed] })
        }
    }
};

module.exports.config = {
    name: "shop",
    en: {
        name: "shop",
        usage: "-",
        description: "Show items"
    },
    ko: {
        name: "상점",
        usage: "-",
        description: "상점에서 파는물건을 보여줍니다."
    },
    category: "fun",
    aliases: ["상점"]
};