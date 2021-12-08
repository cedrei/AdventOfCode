"use strict"

const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function createRNG(input) {
    return {
        numbers: input,
        generate: function() {
            return this.numbers.shift()
        }
    }
}

function createBoards(input) {
    let boardData = input.split("\n\n")
    
    let boards = []
    for (let i of boardData) {
        boards.push({
            data: i.split("\n").map(x => x.trim().split("  ").join(" ").split(" ").map(y => parseInt(y))),
            select: function(n) {
                for (let i = 0; i < this.data.length; i++) {
                    for (let j = 0; j < this.data.length; j++) {
                        if (this.data[i][j] == n) {
                            this.data[i][j] = ["found", n]
                            return this.checkVictory(n)
                        }
                    }
                }
                return false
            },
            checkVictory: function(called) {
                for (let i = 0; i < this.data.length; i++) {
                    let allFound = true
                    for (let j = 0; j < this.data[i].length; j++) {
                        if (this.data[i][j][0] != "found") {
                            allFound = false
                            break
                        }
                    }
                    if (allFound) {
                        return this.getScore(called)
                    }
                }
                for (let i = 0; i < this.data[0].length; i++) {
                    let allFound = true
                    for (let j = 0; j < this.data.length; j++) {
                        if (this.data[j][i][0] != "found") {
                            allFound = false
                            break
                        }
                    }
                    if (allFound) {
                        return this.getScore(called)
                    }
                }
                return false
            },
            getScore: function(final) {
                let score = 0
                for (let i of this.data) {
                    for (let j of i) {
                        if (typeof j == "number") {
                            score += j
                        }
                    }
                }
                return score*final
            }
        })
    }
    return boards
}

function main(input) {
    let rng = createRNG(input.split("\n")[0].split(",").map(x => parseInt(x)))

    let boards = createBoards(input.split("\n").splice(2).join("\n"))
    for (let i = rng.numbers.length; i > 0; i--) {
        let number = rng.generate()
        let done = false

        for (let i = boards.length-1; i >= 0; i--) {
            let board = boards[i]
            let boardWon = board.select(number)
            if (boardWon !== false) {
                if (boards.length > 1) {
                    boards.splice(i,1)
                } else {
                    console.log(boardWon)
                    done = true
                    break
                }
            }
        }
        if (done) {
            break
        }
    }
}