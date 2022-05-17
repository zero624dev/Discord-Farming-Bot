module.exports.run = async ({ message, Canvas: { createCanvas, loadImage }, Discord, fcs: { random } }) => {
    const canvas = createCanvas(200, 200)
    const { height, width } = canvas
    const ctx = canvas.getContext('2d')
    const ore = ["diamond", "coal", "iron", "gold", "emerald", "lapis", "redstone", "cobblestone"]
    for (let i = 0; i <= 3; i++) {
        for (let k = 0; k <= 3; k++) {
            const chance = random(1, 100);
            let ore;
            if (chance <= 20) ore = "cobblestone";
            else if (chance <= 40) ore = "coal";
            else if (chance <= 55) ore = "iron";
            else if (chance <= 70) ore = "gold";
            else if (chance <= 85) ore = "lapis";
            else if (chance <= 95) ore = "diamond";
            else ore = "emerald";
            let img = await loadImage(`/home/ZERO/Share/JS/FarmingBot/Sprites/ore/${ore}.png`)
            ctx.drawImage(img, 50 * i, 50 * k, 50, 50);
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
}

module.exports.config = {
    name: "mine",
    en: {
        name: "mine",
        usage: "-",
        description: "Mining somethings."
    },
    ko: {
        name: "광산",
        usage: "-",
        description: "광산의 광물들을 보여줍니다."
    },
    aliases: ["mine", "광산"],
    permissions: 1
};