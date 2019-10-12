function filter(line, errorcb = () => { }) {
    if (line) {
        const match = line.match(/(.+?)(([A-Za-z]\d{3})?\d{6})/)
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