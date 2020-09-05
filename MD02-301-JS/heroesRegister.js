//  In the era of heroes, every hero has his own items which make him unique. Create a function which 
//  creates a register for the heroes, with their names, level, and items, if they have such. 

// Input Data Format: “{heroName} / {heroLevel} / {item1}, {item2}, {item3}...”

let heroesRegister = []

const storeHero = (inputData) => {
    inputData = inputData.split("/")
    arrayKeys = ["name", "level", "items"]
  
    hero = {}
    for(let i = 0; i < inputData.length; i++) {
        if (i == 2) { // items
            hero[arrayKeys[i]] = inputData[i].replace(/\s/g, '').split(",")
        } else {
            hero[arrayKeys[i]] = inputData[i]
        }
    }
    return hero
}

inputHeroes = [
    "Isacc / 25 / Apple, GravityGun",
    "Derek / 12 / BarrelVest, DestructionSword",
    "Hes / 1 / Desolator, Sentinel, Antara",
    "",
    "Hes / 1"
]

inputHeroes.forEach(hero => {

    //  Hero should have at least name and level
    if (hero.length >= 2) {
        heroesRegister.push(storeHero(hero))
    }
})

console.log(heroesRegister)