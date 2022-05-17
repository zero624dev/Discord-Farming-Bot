module.exports.run = async ({ message, db, findUser, args, Discord, Canvas: { createCanvas, loadImage }, items, dirname, fcs: { random } }) => {
    const num = !isNaN(args[0]) ? Number(args[0]) : "", arg = !isNaN(args[0]) ? args.slice(1).join(" ") : args.join(" ");
    const member = findUser(arg || message.author.id) || { id: 0, tag: "missing user", avatarURL: () => { return "" } };
    const userdata = db.get(`farm.user.${member.id}`)
    if (!userdata) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(member.tag, member.avatarURL())
            .setDescription("**USER NOT FOUND**")
            .setColor("RED")
            .setFooter("Farming Game | ZeroBot");
        message.channel.send({ embeds: [embed] });
    } else {
        const farm = userdata.farm;
        if (!num || num == 0) {
            const canvas = createCanvas(200, 200)
            const { height, width } = canvas
            const ctx = canvas.getContext('2d')
            const num = farm.count;
            const width_arr = [0, -22, 22, -42, 42, -22, 22, 0,
                0, -22, 22, -42, 42, -62, 62, -82, 82,
                -62, 62, -42, 42, -22, 22, 0],
                height_arr = [-21, -10, -10, 0, 0, 10, 10, 21,
                -42, -31, -31, -21, -21, -10, -10, 0, 0,
                    10, 10, 21, 21, 31, 31, 41];
            const width_arr2 = [
                0,
                -22, 22,
                -42, 0, 42,
                -62, -22, 22, 62,
                -82, -42, 42, 82,
                -62, -22, 22, 62,
                -42, 0, 42,
                -22, 22,
                0],
                height_arr2 = [
                    -42,
                    -31, -31,
                    -21, -21, -21,
                    -10, -10, -10, -10,
                    0, 0, 0, 0,
                    10, 10, 10, 10,
                    21, 21, 21,
                    31, 31,
                    41];
            let lefttime = [],
                test = [],
                text = [];
            loadImage(`${dirname}/Sprites/farmland.png`).then(async image => {
                outer: for (let i = 0; i < farm.used.length; i++) {
                    let curlife = (Date.now() - farm.used[i].time) / 60000
                    for (let k = 0; k < text.length; k++) {
                        let texts = text[k].split(" ");
                        if (texts[3] == (curlife >= items[farm.used[i].name].time ? "(can" : `(${(items[farm.used[i].name].time - curlife).toFixed(1)}m`)) {
                            if (texts[2] == farm.used[i].name)
                                text[k] = `${texts[0].split("~")[0]}~${i + 1} ${texts.slice(1).join(" ")}`
                            else
                                text[k] = `${texts[0]},${i + 1} : ${texts[2]},${farm.used[i].name} ${texts.slice(3).join(" ")}`
                            continue outer;
                        }
                    }
                    text.push(`${i + 1} : ${farm.used[i].name} (${curlife >= items[farm.used[i].name].time ? "can harvest" : `${(items[farm.used[i].name].time - curlife).toFixed(1)}m left`})`);
                }
                for (let i = 8; i < (num > 16 ? 16 : num); i++) {
                    await ctx.drawImage(image, 75 + width_arr[i], 75 + height_arr[i], 50, 50)
                    if (farm.used.length > i) {
                        let per = Math.floor((Date.now() - farm.used[i].time) / (items[farm.used[i].name].time * 60000) / 0.125)
                        await loadImage(`${dirname}/Sprites/${farm.used[i].name}/${per > 7 ? 7 : per}.png`).then(sprite => {
                            ctx.drawImage(sprite, 75 + width_arr[i], 75 + height_arr[i] - 27, 50, 50)
                        });
                    }
                }
                for (let i = 0; i < (num > 3 ? 3 : num); i++) {
                    await ctx.drawImage(image, 75 + width_arr[i], 75 + height_arr[i], 50, 50)
                    if (farm.used.length > i) {
                        let per = Math.floor((Date.now() - farm.used[i].time) / (items[farm.used[i].name].time * 60000) / 0.125)
                        await loadImage(`${dirname}/Sprites/${farm.used[i].name}/${per > 7 ? 7 : per}.png`).then(sprite => {
                            ctx.drawImage(sprite, 75 + width_arr[i], 75 + height_arr[i] - 27, 50, 50)
                        });
                    }
                }
                await loadImage(`${dirname}/Sprites/water.png`).then((sprite) => {
                    ctx.drawImage(sprite, width / 2 - 25, height / 2 - 25, 50, 50) // 5 (water)
                });
                for (let i = 3; i < (num > 8 ? 8 : num); i++) {
                    await ctx.drawImage(image, 75 + width_arr[i], 75 + height_arr[i], 50, 50)
                    if (farm.used.length > i) {
                        let per = Math.floor((Date.now() - farm.used[i].time) / (items[farm.used[i].name].time * 60000) / 0.125)
                        await loadImage(`${dirname}/Sprites/${farm.used[i].name}/${per > 7 ? 7 : per}.png`).then(sprite => {
                            ctx.drawImage(sprite, 75 + width_arr[i], 75 + height_arr[i] - 27, 50, 50)
                        });
                    }
                }
                for (let i = 16; i < (num > 24 ? 24 : num); i++) {
                    await ctx.drawImage(image, 75 + width_arr[i], 75 + height_arr[i], 50, 50)
                    if (farm.used.length >= i) {
                        let per = Math.floor((Date.now() - farm.used[i].time) / (items[farm.used[i].name].time * 60000) / 0.125)
                        await loadImage(`${dirname}/Sprites/${farm.used[i].name}/${per > 7 ? 7 : per}.png`).then(sprite => {
                            ctx.drawImage(sprite, 75 + width_arr[i], 75 + height_arr[i] - 27, 50, 50)
                        });
                    }
                }
                // outer: for (let i = 0; i < lefttime.length; i++) {
                // }
                const stream = canvas.createPNGStream()
                const file = new Discord.MessageAttachment(stream, "img.png");
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.tag}'s Farm`, member.avatarURL())
                    .addField(`Slots (${farm.used.length} / ${farm.count})`, text.join("\n").replace(/,/g, ", ") || "no plants")
                    .setImage("attachment://img.png")
                    .setColor("BLUE")
                    .setFooter("Farming Game | ZeroBot");
                message.channel.send({ embeds: [embed], files: [file] })
            });
        }
    }
};

module.exports.config = {
    name: "farm",
    aliases: ["농장", "농사"],
    en: {
        name: "farm",
        usage: "- [number](optional) [username](optional)",
        description: "Shows Someone's farm"
    },
    ko: {
        name: "농장",
        usage: "- [숫자](선택사항) [유저네임](선택사항)",
        description: "자신의 땅이나 다른사람의 땅을 보여줍니다."
    },
    category: "fun"
};