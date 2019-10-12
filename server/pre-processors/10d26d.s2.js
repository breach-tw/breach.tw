function filter(data, errorcb) {
    if (data) {
        let [name, id] = data;
        if (id.length < 6) {
            errorcb()
            return false;
        }
        if (id.length > 6) {
            id = id.slice(id.length - 6);
        }
        return [name, id];
    } else {
        return false
    }
}

module.exports = {
    filter,
    name: "10 Digit ID to 6 digit",
    description: "10 digit ID to 6 digit ID"
}