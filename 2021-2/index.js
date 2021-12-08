const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function main(input) {
    let lines = input.split("\n")
    let commands = lines.map(x => x.split(" "))
    let depth = 0
    let horiz = 0
    let aim = 0
    for (let i of commands) {
        switch (i[0]) {
            case "down":
                aim += parseInt(i[1])
                break
            case "up":
                aim -= parseInt(i[1])
                break
            case "forward":
                horiz += parseInt(i[1])
                depth += parseInt(i[1])*aim
        }
    }
    console.log(depth*horiz)
}