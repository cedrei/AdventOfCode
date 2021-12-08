const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function getMostCommonBit(digits, n) {
    let digitCounts = []
    for (let i = 0; i < digits[0].length; i++) {
        digitCounts.push({"0":0,"1":0})
    }
    for (let i = 0; i < digits.length; i++) {
        for (let j = 0; j < digits[i].length; j++) {
            digitCounts[j][digits[i][j]]++
        }
    }
    //throw "e"
    if (digitCounts[n]["0"]>digitCounts[n]["1"]) {
        return 0
    } else {
        return 1
    }
}

function getRating(digits, isInverted) {
    for (let i = 0; i < digits[0].length; i++) {

        let common = getMostCommonBit(digits, i)
        let inverted = (common-.5)*(-1)+.5
        let wanted = isInverted?inverted:common

        for (let j = digits.length-1; j > -1; j--) {
            if (digits[j][i] != wanted.toString()) {
                digits.splice(j, 1)
            }
        }
        if (digits.length == 1) {
            return parseInt(digits[0].join(""), 2)
        }
    }
}

function main(input) {
    let digits=input.split("\n").map(x => x.split(""))
    let digitsCopy = JSON.parse(JSON.stringify(digits))
    let oxygenRating = getRating(digits, false)
    let co2Rating = getRating(digitsCopy, true)
    console.log(oxygenRating*co2Rating)

}