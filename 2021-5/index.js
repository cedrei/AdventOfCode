const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function padMap(map, x, y) {
    for (let i = 0; i < x; i++) {
        map.push(Array(map[0].length).fill(0))
    }
    for (let i = 0; i < y; i++) {
        for (let j of map) {
            j.push(0)
        }
    }
    return map
}

function generateMap(data) {
    let map = [[0]]
    for (let i of data) {
        let points = i.split(" -> ")
        let from = points[0].split(",").map(x => parseInt(x))
        let to = points[1].split(",").map(x => parseInt(x))
        map = padMap(map, Math.max(from[0], to[0])+1-map.length, Math.max(from[1], to[1])+1-map[0].length)
        if (from[0] == to[0]) {
            for (let i = Math.min(from[1], to[1]); i <= Math.max(from[1], to[1]); i++) {
                map[from[0]][i]++
            }
        } else if (from[1] == to[1]) {
            for (let i = Math.min(from[0], to[0]); i <= Math.max(from[0], to[0]); i++) {
                map[i][from[1]]++
            }
        } else {
            let xDirection = from[0]>to[0]?-1:1
            let yDirection = from[1]>to[1]?-1:1
            let diff = Math.max(from[0], to[0])-Math.min(from[0], to[0])
            for (let i = 0; i <= diff; i++) {
                map[from[0]+i*xDirection][from[1]+i*yDirection]++
            }
        }
    }
    return map
}

function display(map) {
    let str = ""
    for (let i = 0; i < map[0].length; i++) {
        let innerStr = ""
        for (let j = 0; j < map.length; j++) {
            if (map[j][i] == 0) {
                innerStr+="."
            } else {
                innerStr+=map[j][i]
            }
        }
        str+=innerStr+"\n"
    }
    console.log(str)
}

function main(input) {
    let lines = input.split("\n")
    let map = generateMap(lines)
    //display(map)
    let intersections = 0
    for (let i of map) {
        for (let j of i) {
            if (j > 1) {
                intersections++
            }
        }
    }
    console.log(intersections)
}