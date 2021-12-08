const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function main(input) {
    let startingFish = input.split(",").map(x => parseInt(x))
    let fish = Array(9).fill(0)
    for (let i of startingFish) {
        fish[i]++
    }
    for (let i = 0; i < 256; i++) {
        let shiftOut = fish.shift()
        fish[6] += shiftOut
        fish[8] = shiftOut
    }
    let totalFish = 0
    console.log(fish)
    for (let i of fish) {
        totalFish += i
    }
    console.log(totalFish)
}