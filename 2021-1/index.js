const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

function main(input) {
    let nums = input.split("\n").map(x => parseInt(x))
    let count = 0
    let actualNums = []
    for (let i = 2; i < nums.length; i++) {
        actualNums.push(nums[i-2]+nums[i-1]+nums[i])
    }
    for (let i = 1; i < actualNums.length; i++) {
        if (actualNums[i] > actualNums[i-1]) {
            count++
        }
    }
    console.log(count)
}