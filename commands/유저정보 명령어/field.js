module.exports.run = async ({ message, db, findUser, args, Discord, Canvas: { createCanvas, loadImage }, items, dirname, fcs: { random } }) => {
    const num = !isNaN(args[0]) ? Number(args[0]) : 1, arg = !isNaN(args[0]) ? args.slice(1).join(" ") : args.join(" ");
    const member = findUser(arg || message.author.id) || { id: 0, tag: "missing user", avatarURL: () => { return "" } };
    const userdata = db.get(`farm.user.${member.id}`)
    if (!userdata) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(member.tag, member.avatarURL())
            .setDescription("**USER NOT FOUND**")
            .setColor("RED")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else if (!userdata.field[num - 1]) {
        message.channel.send("땅 없음");
    }
    else {
        const canvas = createCanvas(200, 200)
        const { height, width } = canvas
        const ctx = canvas.getContext('2d')
        loadImage(`${dirname}/Sprites/field/${userdata.field[num - 1].name}.png`).then(async (image) => {
            ctx.drawImage(image, 0, 0, 200, 200);
            const Grass = await loadImage("https://cdn.discordapp.com/attachments/716378506019471433/779320336437084180/Grass.png");
            const Dandelion = await loadImage("https://cdn.discordapp.com/attachments/716378506019471433/779320334151057439/Dandelion.png");
            const centwidth = width / 2 - 75,
                centheight = height / 2 - 75;
            // for (let i = -12; i < 13; i++) {
            //     for (let k = -6; k < 8; k++) {
            //         let rand = random(0, 50);
            //         if (rand < 10) {
            //             ctx.drawImage(Grass, centwidth + 75 / 1.15 * k, centheight + 75 / 2.3 * i - 75 / 1.7, 75, 75)
            //         } else if (rand == 1) {
            //             ctx.drawImage(Dandelion, centwidth + 75 / 1.15 * k, centheight + 75 / 2.3 * i - 75 / 1.7, 75, 75)
            //         }
            //     }
            //     if (i != 12)
            //         for (let k = -6; k < 7; k++) {
            //             let rand = random(0, 50);
            //             if (rand < 10) {
            //                 ctx.drawImage(Grass, centwidth + 75 / 1.15 * k + 75 / 1.15 / 2, centheight + 75 / 2.3 * i + 75 / 2.3 / 2 - 75 / 1.7, 75, 75)
            //             } else if (rand > 45) {
            //                 ctx.drawImage(Dandelion, centwidth + 75 / 1.15 * k + 75 / 1.15 / 2, centheight + 75 / 2.3 * i + 75 / 2.3 / 2 - 75 / 1.7, 75, 75)
            //             }
            //         }
            // }
            let animals = userdata.field[num - 1].animals;
            for (let i = 0; i < animals.length; i++) {
                let item = items[animals[i].name]
                if (item.become && (item.become.time - (Date.now() - animals[i].time) / 60000).toFixed(1) <= 0) {
                    animals[i] = { name: item.become.name, time: animals[i].time + 1200000 }
                }
            }
            const adult = animals.filter(f => f.name.slice(0, 4) != "baby");
            const babies = animals.filter(f => f.name.slice(0, 4) === "baby");
            let text = [];
            outer: for (let i = 0; i < babies.length; i++) {
                let left = (20 - (Date.now() - babies[i].time) / 60000).toFixed(1);
                if (left <= 0) {
                    babies[i] = { name: babies[i].name.split("_")[1], time: babies[i].time + 1200000 }
                    for (let k = 0; k < text.length; k++) {
                        let texts = text[k].split(" ");
                        if (texts[0] == babies[i].name) {
                            text[k] = `${texts[0]} x${1 + Number(texts[1].slice(1))} (Full Growth)`
                            continue outer;
                        }
                    }
                    text.push(`${babies[i].name} x1`);
                } else {
                    for (let k = 0; k < text.length; k++) {
                        let texts = text[k].split(" ");
                        if (texts[0] == babies[i].name) {
                            let times = texts[2].slice(1, texts[2].length - 1).split("~")
                            text[k] = `${texts[0]} [${texts[1].slice(1, texts[1].length - 1)},${adult.length + i}] (${times[0] == left ? (times[1] ? `${left}~${times[1]}` : left) : (times[0] < left ? (times[1] ? `${left}~${times[1]}` : `${left}~${times[0]}`) : (times[1] ? (times[1] >= left ? `${times[0]}~${left}` : `${times[0]}~${times[1]}`) : times[0]))}m left)`
                            continue outer;
                        }
                    }
                    text.push(`${babies[i].name} [${adult.length + i}] (${left}m left)`);
                }
            }
            outer: for (let i = 0; i < adult.length; i++) {
                for (let k = 0; k < text.length; k++) {
                    let texts = text[k].split(" ");
                    if (texts[0] == adult[i].name) {
                        text[k] = `${texts[0]} [${texts[1].slice(1, texts[1].length - 1)},${i}]`
                        continue outer;
                    }
                }
                text.push(`${adult[i].name} [${i}]`);
            }
            animals = adult.concat(babies).sort((a, b) => (b.name.includes("chicken") ? 1 : 0) - (a.name.includes("chicken") ? 1 : 0));
            for (let i = 0; i < animals.length; i++) {
                const img = await loadImage(`${dirname}/Sprites/entities/${animals[i].name}.png`);
                const size = items[animals[i].name].size || { x: img.width / 6, y: img.height / 6 };
                flip(ctx, img, random(0, 150), 150 / animals.length * i, size.x, size.y, random(0, 1), false);
            }
            db.set(`farm.user.${member.id}.field.${num - 1}.animals`, animals)
            const stream = canvas.createPNGStream()
            const file = new Discord.MessageAttachment(stream, "img.png");
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.tag}'s ${num}th Field`, member.avatarURL())
                .addField(`Positions (${animals.length} / 10)`, text.join("\n").replace(/,/g, ", ") || "no entities")
                .setImage("attachment://img.png")
                .setColor("BLUE")
                .setFooter("Farming Game | ZeroBot");
            message.channel.send({ embeds: [embed], files: [file] })
        });
    }
    function flip(ctx, image, x = 0, y = 0, sx = 0, sy = 0, horizontal = false, vertical = false) {
        ctx.save();  // save the current canvas state
        ctx.setTransform(
            horizontal ? -1 : 1, 0, // set the direction of x axis
            0, vertical ? -1 : 1,   // set the direction of y axis
            (horizontal ? sx : 0), // set the x origin
            (vertical ? sy : 0)   // set the y origin
        );
        ctx.drawImage(image, x - (horizontal ? 200 : 0), y, sx, sy);
        ctx.restore(); // restore the state as it was when this function was called
    }
}
module.exports.config = {
    name: "field",
    aliases: ["목장", "field"],
    en: {
        name: "field",
        usage: "- [number](optional) [username](optional)",
        description: "Shows Someone's field"
    },
    ko: {
        name: "목장",
        usage: "- [숫자](선택사항) [유저네임](선택사항)",
        description: "자신의 땅이나 다른사람의 땅을 보여줍니다."
    },
    category: "fun"
};