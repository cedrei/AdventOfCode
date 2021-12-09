const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function surround(array, amount) {
    for (let i of array) {
        i.push(amount)
        i.unshift(amount)
    }
    array.push(Array(array[0].length).fill(amount))
    array.unshift(Array(array[0].length).fill(amount))
}

function getBasinCenter(map, x, y) {
    let up = map[x-1][y]
    let down = map[x+1][y]
    let left = map[x][y-1]
    let right = map[x][y+1]
    let here = map[x][y]
    if (here < Math.min(up, down, left, right)) {
        return {
            x,
            y
        }
    } else if (up < Math.min(down, left, right)) {
        return getBasinCenter(map, x-1, y)
    } else if (down < Math.min(left, right)) {
        return getBasinCenter(map, x+1, y)
    } else if (left < right) {
        return getBasinCenter(map, x, y-1)
    } else {
        return getBasinCenter(map, x, y+1)
     }
}

function main(input) {
    let map = input.split("\n").map(x => (x.split("").map(y => parseInt(y))))
    surround(map, Infinity)

    let basins = []

    for (let i of map) {
        let line = []
        for (let j of i) {
            line.push(0)
        }
        basins.push(line)
    }

    for (let i = 1; i < map.length-1; i++) {
        for (let j = 1; j<map[i].length-1; j++) {
            if (map[i][j] == 9) {
                continue
            }

            let basin=getBasinCenter(map, i, j)

            basins[basin.x][basin.y]++
        }
    }

    let score = basins.flat().sort((x, y)=>y-x).slice(0,3).reduce((x, y)=>x*y)

    console.log(score)
}