const fetch = require("node-fetch");

//  We fetch the result and build an aarray of objects { opening_crawl, planets }
const fetchSwapi = async () => {
    let result = []
    const res = await fetch("https://swapi.dev/api/films/")
    const body = await res.json().then(data =>
        data.results.map((item) => {
            //console.log(item.opening_crawl, item.planets)
            result.push({ "opening_crawl" : item.opening_crawl, "planets": item.planets})
        })
        );
    return result;
};

const fetchPlanets = async (url) => {
    let res = await fetch(url)
    let planet_name = await res.json().then(data => {
        return data.name
    })

    return await planet_name;
}

const updateObject = async (current_item) => {

    for (let i = 0; i < current_item.planets.length; i++) {
        await fetchPlanets(current_item.planets[i]).then( result => {
            current_item.planets[i] = result
        })
    }

    return current_item
} 




(async () => {
    let final_result = await fetchSwapi()

    let planet_name;
    let res;

    final_result.forEach(async (item) => {
        updateObject(item).then( result => { console.log(result)})
    })

})();