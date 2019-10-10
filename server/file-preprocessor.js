const lineByLine = require('n-readlines');

const pps = {
    s1: {
        pps: [], 
        descs: []
    },
    s2: {
        pps: [],
        descs: []
    }
}

// Init 
function adds1PP(prep) {
    pps.s1.pps.push(prep.filter)
    pps.s1.descs.push({
        name: prep.name,
        description: prep.description
    })
}

function adds2PP(prep) {
    pps.s2.pps.push(prep.filter)
    pps.s2.descs.push({
        name: prep.name,
        description: prep.description
    })
}

adds1PP(require("./pre-processors/name10digit.s1.js"))
adds2PP(require("./pre-processors/dummy-id.s2.js"))
adds2PP(require("./pre-processors/question-mark.s2.js"))
adds2PP(require("./pre-processors/10d26d.s2.js"))

const s1_to_s2 = require("./pre-processors/s1-to-s2.js");

const crypto = require("crypto");
const hash = input => crypto.createHash("sha1").update(input, "utf8").digest("hex")

function *readLog(path, source, s1pp = [], s2pp = []) {
    const liner = new lineByLine(path);
    let line;
    let count = 0;

    const errors = {
        s1: ({}),
        s2: ({}),
        s1_to_s2: 0
    };
    let s1e = errors.s1;
    let s2e = errors.s2;

    let result = [];
 
    while (line = liner.next()) {
        if (count < 100) {
            let processed = line.toString();
            for (const i of s1pp) {
                if (!s1e[i]) s1e[i] = 0;
                processed = pps.s1.pps[i](processed, () => s1e[i]++);
            }
            processed = s1_to_s2(processed)
            for (const i of s2pp) {
                if (!s2e[i]) s2e[i] = 0;
                processed = pps.s2.pps[i](processed, () => s2e[i]++);
            }
            if (processed) {
                const [name, id] = processed;
                
                result.push(hash(name+id), source)
                count++;
            } else {
                errors.s1_to_s2++;
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