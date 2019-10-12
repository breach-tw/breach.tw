function filter(line, errorcb) {
    if (line) {
        if (!line.includes("?")) {
            return line
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
    name: "Question Mark Filter",
    description: "If there is a question mark in the line, which means something missing in the line, remove that line."
}