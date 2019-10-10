function filter(line, errorcb) {
    if (line) {
        const match = line.match(/(.+)([0-9]{6})/)
        if (match) {
            return [match[1], match[2]]
        } else {
            errorcb()
            return false;
        }
       
    } else {
        return false
    }
}

module.exports = filter