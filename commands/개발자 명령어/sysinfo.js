module.exports.run = ({ sysinfo, message, Discord }) => {
    sysinfo.cpu().then(cpu => {
        sysinfo.currentLoad().then(load => {
            sysinfo.mem().then(mem => {
                sysinfo.cpuTemperature().then(temp => {
                    const embed = new Discord.MessageEmbed()
                        .setColor("BLUE")
                        .addField(`CPU (${load.currentload.toFixed(1)}%)`, `${cpu.manufacturer}${cpu.brand} ${cpu.cores}Cores\nSpeed: ${cpu.speed.slice(0, 3)}GHz \nTemp: ${temp.main.toFixed(1)}℃`, false)
                        .addField(`MEM (${(mem.active / mem.total * 100).toFixed(1)}%)`, `LPDDR4 SDRAM @3.2Ghz\nUsage: ${(mem.active / 1000000000).toString().slice(0, 4)}GB / ${(mem.total / 1000000000).toString().slice(0, 4)}GB\nCached: ${(mem.cached / 1000000000).toString().slice(0, 4)}GB`, false)
                        .setFooter("Raspberry PI 4 Status");
                    message.channel.send({ embeds: [embed] });
                })
            });
        });
    });
}

module.exports.config = {
    name: "sysinfo",
    en: {
        name: "sysinfo",
        usage: "-",
        description: "Shows currunt Rpi's status"
    },
    ko: {
        name: "시스템",
        usage: "-",
        description: "현재 라즈 상태 보여줍니다."
    },
    category: "dev",
    aliases: ["sysinfo", "시스템"],
    permissions: 2
};