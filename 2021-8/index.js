const fs = require("fs")

fs.readFile("input", {encoding: "UTF-8"}, (err, lines) => {
    if (err) {
        throw err
    }

    main(lines)
})

class Segment {
    constructor(segments) {
        this.mapping = this.makeSenseOf(segments.slice(0,10))

        let parse = this.parse.bind(this)
        this.finalFour = segments.slice(10).map(parse)

        this.number = parseInt(this.finalFour.join(""))
    }

    makeSenseOf(segments) {
        let letters = {a:[],b:[],c:[],d:[],e:[],f:[],g:[]}
        for (let i of segments) {
            for (let j of i) {
                letters[j].push(i.length)
            }
        }
        let mapping = {}
        for (let i in letters) {
            let combination = letters[i].sort().join(" ")
            switch (combination) {
                case "3 5 5 5 6 6 6 7":
                    mapping[i] = 0
                    break
                case "4 5 6 6 6 7":
                    mapping[i] = 1
                    break
                case "2 3 4 5 5 6 6 7":
                    mapping[i] = 2
                    break
                case "4 5 5 5 6 6 7":
                    mapping[i] = 3
                    break
                case "5 6 6 7":
                    mapping[i] = 4
                    break
                case "2 3 4 5 5 6 6 6 7":
                    mapping[i] = 5
                    break
                case "5 5 5 6 6 6 7":
                    mapping[i] = 6
                    break
                default:
                    console.error("Whoops?")
            }
        }
        return mapping
    }

    parse(digit) {
        let segments = digit.split("").map(x => this.mapping[x]).sort().join(" ")

        switch(segments) {
            case "0 1 2 4 5 6":
                return 0
            case "2 5":
                return 1
            case "0 2 3 4 6":
                return 2
            case "0 2 3 5 6":
                return 3
            case "1 2 3 5":
                return 4
            case "0 1 3 5 6":
                return 5
            case "0 1 3 4 5 6":
                return 6
            case "0 2 5":
                return 7
            case "0 1 2 3 4 5 6":
                return 8
            case "0 1 2 3 5 6":
                return 9
            default:
                console.error("Whhoops2")
        }
    }
}

function main(input) {
    let segments = input.split("\n").map(x => x.split(" | ").join(" ").split(" ")).map (x => new Segment(x))
    let sum = 0
    for (let i of segments) {
        sum+=i.number
    }
    console.log(sum)
}