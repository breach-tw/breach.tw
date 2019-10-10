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
    description: "Check if name contains '?'"
}