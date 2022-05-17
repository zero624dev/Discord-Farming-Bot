module.exports.run = p => {
    const { message, Canvas: { createCanvas, loadImage }, Discord, args } = p;
    const canvas = createCanvas(720, 480)
    const { height, width } = canvas
    const ctx = canvas.getContext('2d')
    loadImage(`https://cdn.discordapp.com/attachments/765814121844834307/782466668391432242/d.jpg`).then(async (image) => {
        ctx.drawImage(image, 0, 0, 720, 480);
        ctx.font = '50px bold Impact'
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillText(args.join(" "), 20, 110)
        const stream = canvas.createPNGStream()
        const file = new Discord.MessageAttachment(stream, "img.png");
        const embed = new Discord.MessageEmbed()
            .setTitle(`Canvas Test`)
            .setImage("attachment://img.png")
            .attachFiles([file])
            .setColor("BLUE")
            .setFooter("Code Testing | ZeroBot");
        message.channel.send({ embeds: [embed] })
    });
    return;
    let embed = new p.Discord.MessageEmbed()
        .setTitle("몬티 홀의 역설")
        .setDescription("ㄱㄷ")
        .setColor("BULE");
    p.message.channel.send({ embeds: [embed] }).then(msg => {
        let did = 0, not = 0;
        for (let num = 0; num < 1000; num++) {
            let choice = ["o", "x", "x"].sort(() => .5 - Math.random());
            let sel = p.fcs.random(0, 2);
            for (let i = 0; i < 2; i++) {
                if (i != sel && choice[i] == "x") {
                    choice.splice(i, 1);
                }
            }
            if (choice[sel] == "o") not++;
            else did++;
        }
        embed = new p.Discord.MessageEmbed()
            .setTitle("몬티 홀의 역설")
            .setDescription(`1000번 실험\n바꿨을 경우 : ${did}, 그렇지 않을 경우 : ${not}`)
            .setColor("BULE");
        msg.edit({ embeds: [embed] })
    });
    //return p.message.channel.send("테스트 할거없음");
}
module.exports.color_picker = ({ message, Canvas: { createCanvas, loadImage }, Discord, args }) => {
    const canvas = createCanvas(500, 500)
    const ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
    ctx.fill();
    const stream = canvas.createPNGStream()
    const file = new Discord.MessageAttachment(stream, "SPOILER_img.png");
    const embed = new Discord.MessageEmbed()
        .setTitle(`Canvas Test`)
        .setImage("attachment://SPOILER_img.png")
        .attachFiles([file])
        .setColor("BLUE")
        .setFooter("Code Testing | ZeroBot");
    message.channel.send({ embeds: [embed] })
}
module.exports.game = ({ message, Discord }) => {
    liqhved;
    uayhr();
}

module.exports.hangout = ({ message, Discord, args }) => {
    let word = args[0].split("");
    let bars = [];
    for (let i = 0; i < word.length; i++) {
        bars.push("_")
    }
    const embed = new Discord.MessageEmbed()
        .setTitle(`Hangman`)
        .setDescription(`Word: \`${bars.join(" ")}\``)
        .setColor("BLUE")
        .setFooter("Code Testing | Young Bot");
    message.channel.send({ embeds: [embed] }).then(msg_ => {
        const collector = new Discord.MessageCollector(
            message.channel,
            m => m.author.id === message.author.id, { time: 30000 }
        );
        collector.on("collect", msg => {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == msg.content) {
                    bars[i] = word[i];
                    word[i] = "-"
                    break;
                }
            }
            const embed = new Discord.MessageEmbed()
                .setTitle(`Hangman`)
                .setDescription(`Word: \`${bars.join(" ")}\``)
                .setColor("BLUE")
                .setFooter("Code Testing | Young Bot");
            msg_.edit({ embeds: [embed] })
            msg.delete();
            if (!bars.includes("_")) collector.stop("b");
        });
    });
}
//https://trace.moe/?mute&url=
module.exports.rs = ({ message, request, Discord, args, moment }) => {
    request({
        method: "GET",
        url: `https://osu.ppy.sh/api/get_user_recent?k=441c8b094d491ba9fd3025f7212475d9034b3274&limit=100&u=${args.join(" ")}`
    },
        async (err, response, body) => {
            const data_ = JSON.parse(body)
            let tryNum = 0;
            const data = data_[0];
            for (let map of data_) {
                if (map.beatmap_id == data.beatmap_id) tryNum++;
                else break;
            }
            request({
                method: "GET",
                url: `https://osu.ppy.sh/api/get_beatmaps?k=441c8b094d491ba9fd3025f7212475d9034b3274&limit=1&b=${data.beatmap_id}`
            },
                (err, response, body) => {
                    const beatmap = JSON.parse(body)[0];
                    const count300 = Number(data.count300),
                        count100 = Number(data.count100),
                        count50 = Number(data.count50),
                        countmiss = Number(data.countmiss),
                        completion = ((count300 + count100 + count50 + countmiss) / (Number(beatmap.count_normal) + Number(beatmap.count_slider) + Number(beatmap.count_spinner)) * 100).toFixed(2)
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`${beatmap.title} [${beatmap.version}] +${modEnum(data.enabled_mods)} [${Math.round(beatmap.difficultyrating * 100) / 100}★]`, `http://s.ppy.sh/a/${data.user_id}`)
                        .setDescription(`▸ ${data.rank} ▸ **${NaN}PP** ${data.maxcombo == beatmap.max_combo ? "" : `(${NaN}PP for ${NaN}% FC) `}▸ ${accuracyCalc(count300, count100, count50, countmiss)}%\n▸ ${data.score} ▸ x${data.maxcombo}/${beatmap.max_combo} ▸ [${count300}/${count100}/${count50}/${countmiss}]${completion >= 100 ? "" : `\n▸ **Map Completion:** ${completion}%`}`)
                        .setThumbnail(`https://b.ppy.sh/thumb/${beatmap.beatmapset_id}l.jpg`)
                        .setColor("BLUE")
                        .setFooter(`Try #${tryNum} | ${moment
                            .duration(new Date() - new Date(data.date))
                            .format(" D [days], H [hours], m [minutes], s [seconds]")} Ago On osu! Official Server`);
                    message.channel.send({ embeds: [embed] })
                    //message.channel.send(`${beatmap.title} [${beatmap.version}] +${modEnum(data.enabled_mods)} [${Math.round(beatmap.difficultyrating * 100) / 100}☆]\n▸ ${data.rank} ▸ ?pp(?pp for ?% FC) ▸ ${accuracyCalc(count300, count100, count50, countmiss)}%\n▸ ${data.score} ▸ x${data.maxcombo}/${beatmap.max_combo} ▸ [${count300}/${count100}/${count50}/${countmiss}]\n▸ **Map Completion:** ${((count300 + count100 + count50 + countmiss + Number(data.countkatu) + Number(data.countgeki) + Number(data.perfect)) / beatmap.max_combo * 100).toFixed(2)}% \nhttps://b.ppy.sh/thumb/${beatmap.beatmapset_id}l.jpg`)
                }
            );
        });
    function accuracyCalc(n300, n100, n50, n0) {
        return ((300 * n300 + 100 * n100 + 50 * n50) / (300 * (n300 + n100 + n50 + n0)) * 100).toFixed(2)
    }
    function modEnum(modNum) {
        let modTxt = "";
        const refArr = [
            16416,
            8192,
            4096,
            2048,
            1024,
            576,
            256,
            128,
            64,
            32,
            16,
            8,
            4,
            2,
            1
        ];
        const modsObj = {
            16416: "PF",
            8192: "AP",
            4096: "SO",
            2048: "AT",
            1024: "FL",
            576: "NC",
            256: "HT",
            128: "RX",
            64: "DT",
            32: "SD",
            16: "HR",
            8: "HD",
            4: "Touch",
            2: "EZ",
            1: "NF"
        };
        if (modNum == 0) return "No Mod";
        for (var i = 0; modNum > 0; i++) {
            if (modNum - refArr[i] >= 0) {
                modNum -= refArr[i];
                modTxt += modsObj[refArr[i]];
            }
        }
        return modTxt;
    }
}

module.exports.message = ({ message, fs, Discord }) => {
    try {
        const { Readable } = require('stream');

        const inStream = new Readable();

        inStream.push("import discord\nclient = discord.Client()\n\n@client.event\nasync def on_ready():\n    print('We have logged in as {0.user}'.format(client))\n\n@client.event\nasync def on_message(message):\n    if message.author == client.user:\n        return\nif message.content.startswith('$hello'):\n        await message.channel.send('Hello!')\n\nclient.run('your token here')");

        inStream.push(null);
        const file = new Discord.MessageAttachment(inStream, "test.py");
        message.channel.send({ files: [file] });
        /*var writeStream = fs.createWriteStream('./test.py');
        writeStream.write("import discord\nclient = discord.Client()\n\n@client.event\nasync def on_ready():\n    print('We have logged in as {0.user}'.format(client))\n\n@client.event\nasync def on_message(message):\n    if message.author == client.user:\n        return\nif message.content.startswith('$hello'):\n        await message.channel.send('Hello!')\n\nclient.run('your token here')")
        //writeStream.end()
        message.channel.send({ files: [writeStream] });*/
    } catch (e) {
        message.channel.send(
            `\`\`\`${e.toString().slice(0, 1950)}\n\n...\`\`\``
        );
    }
}
module.exports.graph = ({ message, Canvas: { createCanvas }, Discord, fcs: { random }, args }) => {
    const canvas = createCanvas(480, 480)
    const ctx = canvas.getContext('2d')
    const test = args//[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    ctx.font = '15px bold Impact'
    ctx.strokeStyle = 'rgb(41, 41, 41)'
    ctx.beginPath()//41, 41, 41
    ctx.lineTo(50, 50)
    ctx.lineTo(50, 423)
    ctx.stroke()
    for (let i = 0; i <= 24; i++) {
        ctx.fillText(`${i}`, 30, 430 - 15 * i)
        ctx.beginPath()
        ctx.lineTo(50, 430 - 15 * i - 7)
        ctx.lineTo(480, 430 - 15 * i - 7)
        ctx.stroke()
    }
    for (let i = 0; i < 30; i++) {
        ctx.beginPath()
        ctx.lineTo(50 + 15 * i, 50)
        ctx.lineTo(50 + 15 * i, 423)
        ctx.stroke()
    }
    ctx.strokeStyle = 'rgb(0, 194, 255)'
    ctx.lineWidth = 3;
    for (let i = 0; i < test.length; i++) {
        if (i == test.length - 1) continue;
        ctx.beginPath()
        ctx.lineTo(50 + 15 * i, 430 - 15 * test[i] - 7)
        ctx.lineTo(50 + 15 * (i + 1), 430 - 15 * test[i + 1] - 7)
        ctx.stroke()
    }
    ctx.fillText(`1`, 45, 440)
    ctx.fillText(`5`, 105, 440)
    ctx.fillText(`10`, 180, 440)
    ctx.fillText(`15`, 250, 440)
    ctx.fillText(`20`, 320, 440)
    ctx.fillText(`25`, 390, 440)
    ctx.fillText(`30`, 460, 440)
    const stream = canvas.createPNGStream()
    const file = new Discord.MessageAttachment(stream, "img.png");
    const embed = new Discord.MessageEmbed()
        .setTitle(`Canvas Test`)
        .setImage("attachment://img.png")
        .attachFiles([file])
        .setColor("BLUE")
        .setFooter("Code Testing | Young Bot");
    message.channel.send({ embeds: [embed] })
}
module.exports.expendedfarm = ({ message, Canvas: { createCanvas, loadImage }, Discord, fcs: { random }, dirname }) => {
    const canvas = createCanvas(2000, 2000)
    const { height, width } = canvas
    const ctx = canvas.getContext('2d')
    loadImage(`https://cdn.discordapp.com/attachments/716378506019471433/779291731778207744/Grass_Block.png`).then(async (image) => {
        const Grass = await loadImage("https://cdn.discordapp.com/attachments/716378506019471433/779320336437084180/Grass.png");
        const Dandelion = await loadImage("https://cdn.discordapp.com/attachments/716378506019471433/779320334151057439/Dandelion.png");
        const centwidth = width / 2 - image.width,
            centheight = height / 2 - image.height;
        for (let i = -11; i < 13; i++) {
            for (let k = -6; k < 8; k++) {
                ctx.drawImage(image, centwidth + image.width / 1.15 * k, centheight + image.height / 2.3 * i, image.width, image.height)
                /*let rand = random(0, 50);
                if (rand < 10) {
                    ctx.drawImage(Grass, centwidth + image.width / 1.15 * k, centheight + image.height / 2.3 * i - image.height / 1.7, image.width, image.height)
                } else if (rand == 1){
                    ctx.drawImage(Dandelion, centwidth + image.width / 1.15 * k, centheight + image.height / 2.3 * i - image.height / 1.7, image.width, image.height)
                }*/
            }
            if (i != 12)
                for (let k = -6; k < 7; k++) {
                    ctx.drawImage(image, centwidth + image.width / 1.15 * k + image.width / 1.15 / 2, centheight + image.height / 2.3 * i + image.height / 2.3 / 2, image.width, image.height)
                    /*let rand = random(0, 50);
                    if (rand < 10) {
                        ctx.drawImage(Grass, centwidth + image.width / 1.15 * k + image.width / 1.15 / 2, centheight + image.height / 2.3 * i + image.height / 2.3 / 2 - image.height / 1.7, image.width, image.height)
                    } else if (rand > 45){
                        ctx.drawImage(Dandelion, centwidth + image.width / 1.15 * k + image.width / 1.15 / 2, centheight + image.height / 2.3 * i + image.height / 2.3 / 2 - image.height / 1.7, image.width, image.height)
                    }*/
                }
        }
        const stream = canvas.createPNGStream()
        const file = new Discord.MessageAttachment(stream, "img.png");
        const embed = new Discord.MessageEmbed()
            .setTitle(`Canvas Test`)
            .setImage("attachment://img.png")
            .attachFiles([file])
            .setColor("BLUE")
            .setFooter("Code Testing | ZeroBot");
        message.channel.send({ embeds: [embed] })
    });
}
module.exports.expendedfarm2 = ({ message, Canvas: { createCanvas, loadImage }, Discord, fcs: { random }, dirname }) => {
    const canvas = createCanvas(500, 500)
    const { height, width } = canvas
    const ctx = canvas.getContext('2d')
    loadImage(`https://cdn.discordapp.com/attachments/716378506019471433/779291731778207744/Grass_Block.png`).then(async (image) => {
        const Grass = await loadImage("https://cdn.discordapp.com/attachments/716378506019471433/779320336437084180/Grass.png");
        const Dandelion = await loadImage("https://cdn.discordapp.com/attachments/716378506019471433/779320334151057439/Dandelion.png");
        console.log(image.width / 4)
        const centwidth = width / 2 - image.width / 4,
            centheight = height / 2 - image.height / 4;
        for (let i = -11; i < 13; i++) {
            for (let k = -6; k < 8; k++) {
                ctx.drawImage(image, centwidth + image.width / 4 / 1.15 * k, centheight + image.height / 4 / 2.3 * i, image.width / 4, image.height / 4)
                /*let rand = random(0, 50);
                if (rand < 10) {
                    ctx.drawImage(Grass, centwidth + image.width / 1.15 * k, centheight + image.height / 2.3 * i - image.height / 1.7, image.width, image.height)
                } else if (rand == 1){
                    ctx.drawImage(Dandelion, centwidth + image.width / 1.15 * k, centheight + image.height / 2.3 * i - image.height / 1.7, image.width, image.height)
                }*/
            }
            if (i != 12)
                for (let k = -6; k < 7; k++) {
                    ctx.drawImage(image, centwidth + image.width / 4 / 1.15 * k + image.width / 4 / 1.15 / 2, centheight + image.height / 4 / 2.3 * i + image.height / 4 / 2.3 / 2, image.width / 4, image.height / 4)
                    /*let rand = random(0, 50);
                    if (rand < 10) {
                        ctx.drawImage(Grass, centwidth + image.width / 1.15 * k + image.width / 1.15 / 2, centheight + image.height / 2.3 * i + image.height / 2.3 / 2 - image.height / 1.7, image.width, image.height)
                    } else if (rand > 45){
                        ctx.drawImage(Dandelion, centwidth + image.width / 1.15 * k + image.width / 1.15 / 2, centheight + image.height / 2.3 * i + image.height / 2.3 / 2 - image.height / 1.7, image.width, image.height)
                    }*/
                }
        }
        const stream = canvas.createPNGStream()
        const file = new Discord.MessageAttachment(stream, "img.png");
        const embed = new Discord.MessageEmbed()
            .setTitle(`Canvas Test`)
            .setImage("attachment://img.png")
            .attachFiles([file])
            .setColor("BLUE")
            .setFooter("Code Testing | ZeroBot");
        message.channel.send({ embeds: [embed] })
    });
}
module.exports.eightfarm = ({ message, Canvas: { createCanvas, loadImage }, Discord, fcs: { random }, dirname, args }) => {
    const canvas = createCanvas(200, 200)
    const { height, width } = canvas
    const ctx = canvas.getContext('2d')
    const num = Number(args[0]) || 8, specie = args[1], growth = Number(args[2]);
    const width_arr = [0, -22, 22, -42, 42, -22, 22, 0, 0, -22, 22, -42, 42, -62, 62, -82, 82, -62, 62, -42, 42, -22, 22, 0],
        height_arr = [-21, -10, -10, 0, 0, 10, 10, 21, -42, -31, -31, -21, -21, -10, -10, 0, 0, 10, 10, 21, 21, 31, 31, 41]
    loadImage(`${dirname}/Sprites/farmland.png`).then(async image => {
        for (let i = 8; i < (num > 16 ? 16 : num); i++) {
            await ctx.drawImage(image, 75 + width_arr[i], 75 + height_arr[i], 50, 50)
        }
        for (let i = 0; i < (num > 3 ? 3 : num); i++) {
            await ctx.drawImage(image, 75 + width_arr[i], 75 + height_arr[i], 50, 50)
        }
        await loadImage(`${dirname}/Sprites/water.png`).then((sprite) => {
            ctx.drawImage(sprite, width / 2 - 25, height / 2 - 25, 50, 50) // 5 (water)
        });
        for (let i = 3; i < (num > 8 ? 8 : num); i++) {
            await ctx.drawImage(image, 75 + width_arr[i], 75 + height_arr[i], 50, 50)
        }
        for (let i = 16; i < (num > 24 ? 24 : num); i++) {
            await ctx.drawImage(image, 75 + width_arr[i], 75 + height_arr[i], 50, 50)
        }
        // for (let i = 0; i < (num > 8 ? 8 : num); i++) {
        //     await loadImage(`${dirname}/Sprites/${specie || ["wheat_seed", "potato", "carrot"][random(0, 2)]}/${growth || random(0, 7)}.png`).then((sprite) => {
        //         ctx.drawImage(sprite, width / 2 - 25 + width_arr[i], height / 2 - 25 + height_arr[i] - 27, 50, 50)
        //     });
        // }
        // await loadImage(`${dirname}/Sprites/mobs/zombie_with_shovel.png`).then((sprite) => {
        //     ctx.drawImage(sprite, width / 2 - sprite.width / 7 / 2, height / 2 - sprite.height / 7, sprite.width / 7, sprite.height / 7)
        // });
        const stream = canvas.createPNGStream()
        const file = new Discord.MessageAttachment(stream, "img.png");
        const embed = new Discord.MessageEmbed()
            .setTitle(`Canvas Test`)
            .setImage("attachment://img.png")
            .attachFiles([file])
            .setColor("BLUE")
            .setFooter("Code Testing | Young Bot");
        message.channel.send({ embeds: [embed] })
    });
}
module.exports.config = {
    name: "test",
    en: {
        name: "test",
        usage: "-",
        description: "test"
    },
    ko: {
        name: "test",
        usage: "-",
        description: "test"
    },
    category: "dev",
    aliases: [],
    permissions: 2
};