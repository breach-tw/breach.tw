function filter(data, errorcb) {
    if (!data) return false;
    let [name, id] = data;

    for (const char of name) {
        if (char.match(/[A-Z|a-z|ü|é]/i)) {
            errorcb()
            return false;
        }
    }

    return data;
}

module.exports = {
    filter,
    name: "Name English Filter",
    description: "If there is English character in the name, then filter it out."
}