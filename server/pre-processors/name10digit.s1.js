function filter(line, errorcb) {
    if (line) {
        const match = line.match(/(.+)([a-zA-Z0-9]{10})/)
        if (match) {
            return match[1] + match[2].slice(match[2].length - 6)
        } else {
            errorcb()
            return false;
        }
       
    } else {
        return false
    }
}

module.exports = {
    filter,
    name: "name10digit",
    description: "Parse Name+10dID to Name+6dID"
}