const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function getTotalDist(data, goal) {
    let sum = 0
    for (let i of data) {
        sum += (Math.abs(goal-i)+(goal-i)**2)/2
    }
    return sum
}

function main(input) {
    let data = input.split(",").map(x => parseInt(x))
    let bestScore = Infinity
    let bestPos = null
    let min = Math.min(...data)
    let max = Math.max(...data)
    for (let i = min; i < max; i++) {
        let score = getTotalDist(data, i)
        if (score < bestScore) {
            bestScore = score
            bestPos = i
        }
    }
    console.log(getTotalDist(data, bestPos))
    console.log(bestPos)
}