const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function getValue(line) {
    let stack = []
    let closing = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    }

    let scores = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    }

    for (let i of line) {
        if (closing[i] != undefined) {
            stack.push(i)
        } else {
            let lastOpener = stack.pop()
            if (closing[lastOpener] != i) {
                return 0
            }
        }
    }

    let score = 0
    while (stack.length != 0) {
        let nextCloser = closing[stack.pop()]
        score *= 5
        score += scores[nextCloser]
    }
    
    return score
}

function main(input) {
    let lines = input.split("\n")

    let scores = lines.map(x => getValue(x)).filter(x => x!=0).sort((a,b)=>a-b)

    console.log(scores[(scores.length-1)/2])
}