// 작물
module.exports.wheat_seed = {
    name: "Wheat Seed",
    buy: 5,
    sell: 3,
    harvest: { name: "wheat", amount: "i1" },
    shop_code: "c0",
    time: 5,
    img: "https://cdn.discordapp.com/attachments/716378506019471433/740469714022694992/WheatSeeds.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.wheat_seed.shop_code} \n성장 시간: ${this.wheat_seed.time}분 \n설명: 심어서 밀을 얻으세요.` :
        `Shop Code: ${this.wheat_seed.shop_code} \nGrowth time: ${this.wheat_seed.time}m \nDescription: Plant it and harvest wheat.`,
    type: "seed"
}

module.exports.wheat = {
    name: "Wheat",
    buy: 30,
    sell: 15,
    shop_code: "c1",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/740509396357873726/Wheat.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.wheat.shop_code} \n설명: 다 성장한 밀.` :
        `Shop Code: ${this.wheat.shop_code} \nDescription: Wheat.`,
    type: "crop"
}

module.exports.beetroot_seed = {
    name: "Beetroot Seed",
    buy: 5,
    sell: 3,
    harvest: { name: "beetroot", amount: "r2-4" },
    shop_code: "c4",
    time: 5,
    img: "https://cdn.discordapp.com/attachments/716378506019471433/781104979255623740/Beetroot_Seeds.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.beetroot_seed.shop_code} \n성장 시간: ${this.wheat_seed.time}분 \n설명: 심어서 2~4개의 사탕무를 얻으세요.` :
        `Shop Code: ${this.beetroot_seed.shop_code} \nGrowth time: ${this.wheat_seed.time}m \nDescription: Plant it and harvest 2-4 Beetroots.`,
    type: "seed"
}

module.exports.beetroot = {
    name: "Beetroot",
    buy: 10,
    sell: 6,
    shop_code: "c5",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/781104980878163998/Beetroot.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.beetroot.shop_code} \n설명: 다 성장한 사탕무.` :
        `Shop Code: ${this.beetroot.shop_code} \nDescription: Beetroot.`,
    type: "crop"
}

module.exports.melon_seed = {
    name: "Melon Seed",
    buy: 50,
    sell: 25,
    harvest: { name: "melon", amount: "i1" },
    shop_code: "c6",
    time: 7,
    img: "https://cdn.discordapp.com/attachments/716378506019471433/782474288544481340/Melon_Seeds.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.melon_seed.shop_code} \n설명: 심어서 수박을 얻으세요.` :
        `Shop Code: ${this.melon_seed.shop_code} \nDescription: Plant it and harvest Melon.`,
    type: "seed"
}

module.exports.melon = {
    name: "Melon",
    buy: 500,
    sell: 250,
    shop_code: "c7",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/782473141670248448/Melon.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.melon.shop_code} \n설명: 다 성장한 수박.` :
        `Shop Code: ${this.melon.shop_code} \nDescription: Melon.`,
    type: "crop"
}

module.exports.potato = {
    name: "Potato",
    buy: 10,
    sell: 6,
    harvest: { name: "potato", amount: "r2-4" },
    shop_code: "c2",
    time: 5,
    img: "https://cdn.discordapp.com/attachments/716378506019471433/741255295296208956/Potato.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.potato.shop_code} \n성장 시간: ${this.potato.time}분 \n설명: 심어서 2-4개의 감자을 얻으세요.` :
        `Shop Code: ${this.potato.shop_code} \nGrowth time: ${this.potato.time}m \nDescription: Plant it and harvest 2-4 potatos.`,
    type: "seed"
}

module.exports.carrot = {
    name: "Carrot",
    buy: 10,
    sell: 6,
    harvest: { name: "carrot", amount: "r2-4" },
    shop_code: "c3",
    time: 5,
    img: "https://cdn.discordapp.com/attachments/716378506019471433/741255633764089856/Carrot.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.carrot.shop_code} \n성장 시간: ${this.carrot.time}분 \n설명: 심어서 2-4개의 당근을 얻으세요.` :
        `Shop Code: ${this.carrot.shop_code} \nGrowth time: ${this.carrot.time}m \nDescription: Plant it and harvest 2-4 carrots.`,
    type: "seed"
}
// 도구 

module.exports.shears = {
    name: "Shears",
    buy: 50,
    sell: 0,
    shop_code: "t0",
    durability: 75,
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780355910899204126/Shears.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: t0 \n내구도: 75 \n설명: 사용하여 양털을 깎습니다.` :
        `Shop Code: t0 \nDurability: 75 \nDescription: Use to shear the sheep.`,
    type: "tool"
}

module.exports.bucket = {
    name: "Bucket",
    buy: 75,
    sell: 0,
    shop_code: "t1",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780355909028544532/Bucket.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: t1 \n설명: 사용하여 우유를 짭니다.` :
        `Shop Code: t1 \nDescription: Use to squeeze milk.`,
    type: "tool"
}

module.exports.sword = {
    name: "Sword",
    buy: 120,
    sell: 0,
    shop_code: "t2",
    durability: 150,
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780355907069673482/Iron_Sword.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: t2 \n내구도: 150 \n설명: 사용하여 엔티티를 죽입니다.` :
        `Shop Code: t2 \nDurability: 150 \nDescription: Use to kill entity.`,
    type: "tool"
}
// 소모품
module.exports.farm_land = {
    name: "Farm Land",
    buy: 100,
    sell: 100,
    shop_code: "b0",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/740470477515915304/farmland.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.farm_land.shop_code} \n설명: 사용하여 땅을 확장합니다.` :
        `Shop Code: ${this.farm_land.shop_code} \nDescription: Use to expand the farmland.`,
    type: "block"
}

// 목초지
module.exports.green_field = {
    name: "Green Field",
    buy: 700,
    sell: 0,
    shop_code: "f0",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779291731778207744/Grass_Block.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.green_field.shop_code} \n설명: 목장의 갯수를 늘립니다.` :
        `Shop Code: ${this.green_field.shop_code} \nDescription: Adds farm for animal.`,
    type: "field"
}

// 엔티티
module.exports.villager = {
    name: "Villager",
    size: { x: 20, y: 28 },
    buy: 10000,
    sell: 0,
    shop_code: "e4",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/783562414603239434/Village.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.baby_cow.shop_code} \n설명: 주민, 일을 대신한다.` :
        `Shop Code: ${this.baby_cow.shop_code} \nDescription: Baby Cow.`,
    type: "entity"
}

module.exports.baby_cow = {
    name: "Baby Cow",
    size: { x: 20, y: 28 },
    become: { name: "cow", time: 20 },
    buy: 200,
    sell: 0,
    shop_code: "e0",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779353666997714974/Baby_Cow.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.baby_cow.shop_code} \n설명: 송아지.` :
        `Shop Code: ${this.baby_cow.shop_code} \nDescription: Baby Cow.`,
    type: "entity"
}

module.exports.cow = {
    name: "Cow",
    size: { x: 45, y: 50 },
    drops: [{ name: "leather", amount: "r1-3" }, { name: "raw_beef", amount: "r3-5" }],
    buy: 0,
    sell: 0,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779353668918575144/Cow.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.cow.shop_code} \n설명: 가죽과 고기, 우유를 줍니다.` :
        `Shop Code: ${this.cow.shop_code} \nDescription: Gives leather, beef, and milk.`,
    type: "entity"
}

module.exports.baby_chicken = {
    name: "Baby Chicken",
    become: { name: "chicken", time: 20 },
    size: { x: 20, y: 28 },
    buy: 50,
    sell: 0,
    shop_code: "e1",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779357161741484063/Baby_Chicken.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.baby_chicken.shop_code} \n설명: 병아리.` :
        `Shop Code: ${this.baby_chicken.shop_code} \nDescription: Baby Chicken.`,
    type: "entity"
}

module.exports.chicken = {
    name: "Chicken",
    size: { x: 35, y: 45 },
    drops: [{ name: "feather", amount: "r1-3" }, { name: "raw_chicken", amount: "i1" }],
    buy: 0,
    sell: 0,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779357159133151232/Chicken.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.chicken.shop_code} \n설명: 깃털과 닭고기, 달걀을 줍니다.` :
        `Shop Code: ${this.chicken.shop_code} \nDescription: Gives feather, chicken, and egg.`,
    type: "entity"
}

module.exports.baby_pig = {
    name: "Baby Pig",
    size: { x: 20, y: 30 },
    become: { name: "pig", time: 20 },
    buy: 150,
    sell: 0,
    shop_code: "e2",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779357157195644978/Baby_Pig.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.baby_pig.shop_code} \n설명: 아기 돼지.` :
        `Shop Code: ${this.baby_pig.shop_code} \nDescription: Baby Pig.`,
    type: "entity"
}

module.exports.pig = {
    name: "Pig",
    size: { x: 45, y: 50 },
    drops: [{ name: "raw_porkchop", amount: "r2-4" }],
    buy: 0,
    sell: 0,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779357155139518484/Pig.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.pig.shop_code} \n설명: 돼지고기를 줍니다.` :
        `Shop Code: ${this.pig.shop_code} \nDescription: Gives pork.`,
    type: "entity"
}

module.exports.baby_sheep = {
    name: "Baby Sheep",
    size: { x: 20, y: 28 },
    become: { name: "sheep", time: 20 },
    buy: 150,
    sell: 0,
    shop_code: "e3",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779357167802253322/Baby_Sheep.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.baby_sheep.shop_code} \n설명: 아기 양.` :
        `Shop Code: ${this.baby_sheep.shop_code} \nDescription: Baby Sheep.`,
    type: "entity"
}

module.exports.sheep = {
    name: "Sheep",
    size: { x: 45, y: 50 },
    drops: [{ name: "wool", amount: "i1" }, { name: "raw_mutton", amount: "r2-4" }],
    sheared: { name: "sheared_sheep", drops: [{ name: "wool", amount: "r1-3" }] },
    buy: 0,
    sell: 0,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779357163822383134/Sheep.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.sheep.shop_code} \n설명: 양고기와 양털를 줍니다.` :
        `Shop Code: ${this.sheep.shop_code} \nDescription: Gives mutton and wool.`,
    type: "entity"
}

module.exports.sheared_sheep = {
    name: "Sheared Sheep",
    size: { x: 45, y: 50 },
    drops: [{ name: "raw_mutton", amount: "r2-4" }],
    become: { name: "sheep", time: 5 },
    buy: 0,
    sell: 0,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/779357165722927154/Sheared_Sheep.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.sheared_sheep.shop_code} \n설명: 양고기를 줍니다.` :
        `Shop Code: ${this.sheared_sheep.shop_code} \nDescription: Gives mutton.`,
    type: "entity"
}

// 고기
module.exports.raw_chicken = {
    name: "Raw Chicken",
    buy: 0,
    sell: 85,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780806100852801546/Raw_Chicken.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.raw_chicken.shop_code} \n설명: 생 닭고기.` :
        `Shop Code: ${this.raw_chicken.shop_code} \nDescription: Raw Chicken.`,
    type: "item"
}

module.exports.raw_mutton = {
    name: "Raw Mutton",
    buy: 0,
    sell: 75,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780806105046450176/Raw_Mutton.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.raw_mutton.shop_code} \n설명: 생 양고기.` :
        `Shop Code: ${this.raw_mutton.shop_code} \nDescription: Raw Mutton.`,
    type: "item"
}

module.exports.raw_porkchop = {
    name: "Raw Porkchop",
    buy: 0,
    sell: 75,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780806107123810304/Raw_Porkchop.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.raw_porkchop.shop_code} \n설명: 생 돼지고기.` :
        `Shop Code: ${this.raw_porkchop.shop_code} \nDescription: Raw Porkchop.`,
    type: "item"
}

module.exports.raw_beef = {
    name: "Raw Beef",
    buy: 0,
    sell: 85,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780806103419453490/Raw_Beef.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.raw_beef.shop_code} \n설명: 생 소고기.` :
        `Shop Code: ${this.raw_beef.shop_code} \nDescription: Raw Beef.`,
    type: "item"
}

module.exports.feather = {
    name: "Feather",
    buy: 0,
    sell: 5,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780814512453451786/Feather.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.feather.shop_code} \n설명: 깃털.` :
        `Shop Code: ${this.feather.shop_code} \nDescription: Feather.`,
    type: "item"
}

module.exports.leather = {
    name: "Leather",
    buy: 0,
    sell: 10,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780814524876980284/Leather.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.leather.shop_code} \n설명: 가죽.` :
        `Shop Code: ${this.leather.shop_code} \nDescription: Leather.`,
    type: "item"
}

module.exports.wool = {
    name: "Wool",
    buy: 0,
    sell: 10,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780814505219194931/Wool.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.wool.shop_code} \n설명: 양털.` :
        `Shop Code: ${this.wool.shop_code} \nDescription: Wool.`,
    type: "item"
}

module.exports.egg = {
    name: "Egg",
    buy: 0,
    sell: 25,
    shop_code: "",
    img: "https://cdn.discordapp.com/attachments/716378506019471433/780814518464806912/Egg.png",
    description: (message) => message.guild.region == "south-korea" ?
        `상점 코드: ${this.egg.shop_code} \n설명: 달걀.` :
        `Shop Code: ${this.egg.shop_code} \nDescription: Egg.`,
    type: "item"
}