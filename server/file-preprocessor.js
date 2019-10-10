const lineByLine = require('n-readlines');

const pps = {
    s1: {
        pps: [], 
        subs: []
    },
    s2: {
        pps: [],
        subs: []
    }
}

// Init 
function adds1PP(prep) {
    pps.s1.pps.push(prep.filter)
    pps.s1.subs.push({
        name: prep.name,
        subscription: prep.subscription
    })
}

function adds2PP(prep) {
    pps.s2.pps.push(prep.filter)
    pps.s2.subs.push({
        name: prep.name,
        subscription: prep.subscription
    })
}

adds1PP(require("./pre-processors/name10digit.s1.js"))
adds2PP(require("./pre-processors/dummy-id.s2.js"))
adds2PP(require("./pre-processors/question-mark.s2.js"))
adds2PP(require("./pre-processors/10d26d.s2.js"))

const crypto = require("crypto");
const hash = input => crypto.createHash("sha1").update(input, "utf8").digest("hex")

function *readLog(path, source, s1pp = [], s2pp = []) {
    const liner = new lineByLine(path);
    let line;
    let count = 0;
    let errors = 0;
    let result = [];
 
    while (line = liner.next()) {
        if (count < 100) {
            let processed = line.toString();
            for (const i of s1pp) {
                processed = pps.s1.pps[i](processed);
            }
            for (const i of s2pp) {
                processed = pps.s2.pps[i](processed);
            }
            if (processed) {
                const [name, id] = processed;
                
                result.push(hash(name+id), source)
                count++;
            } else {
                errors++;
            }
        } else {
            yield result;
            count = 0;
            result = [];
        }
    }
    if (count) {
        yield result;
    }
    return errors;
}

module.exports = {
    readLog,
    pps
}