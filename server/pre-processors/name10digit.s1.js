function filter(line) {
    if (line) {
        const match = line.match(/(.+)(.{10})/)
        return [match[1], match[2]]
    } else {
        return false
    }
}

module.exports = {
    filter,
    name: "name10digit",
    description: "Parse Name+10dID to s2 format"
}