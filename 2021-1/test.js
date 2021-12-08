const fs = require("fs")

let result = {}
let pending = 0

fs.readdir('/home/einar/Hämtningar/ExtendedTimeline/ExtendedTimeline/history/countries', (err, data) => {
    for (let i of data) {
        if (["EUR - Europeanunion.txt", "NAT - Natives.txt", "PIR - Pirates.txt", "REB - Rebel Scum.txt", "SYN - Synthetics.txt"].includes(i)) {
            continue
        }
        pending++
        fs.readFile('/home/einar/Hämtningar/ExtendedTimeline/ExtendedTimeline/history/countries/'+i, {encoding: "UTF-8"}, (err, data) => {
            let culture=data.split("\n").filter(x=>x.substring(0,15)=="primary_culture")[0].split("=")[1].split("#")[0].trim()
            if (result[culture] == undefined) {
                result[culture] = []
            }
            result[culture].push(i)
            pending--
            if (pending == 0) {
                nextPhase()
            }
        });
    }
});

let danglingCultures = new Set()
let totalCultures = {}

function nextPhase() {
    let pending=0
    fs.readdir("/home/einar/Hämtningar/ExtendedTimeline/ExtendedTimeline/history/provinces", (err, data) => {
        for (let i of data) {
            pending++
            fs.readFile("/home/einar/Hämtningar/ExtendedTimeline/ExtendedTimeline/history/provinces/"+i, {encoding: "utf-8"}, (err, data) => {
                let cultures = data.split("\n").filter(x=>x.substring(0,7)=="culture")
                if (cultures.length == 0) {
                    pending--
                    return
                }
                let culture = cultures[0].split("=")[1].split("#")[0].trim()
                if (result[culture] == undefined) {
                    danglingCultures.add(culture)
                }
                if (totalCultures[culture] == undefined) {
                    totalCultures[culture] = result[culture]
                }
                pending--
                if (pending==0) {
                    console.log(danglingCultures)
                }
            })
        }
    })
}