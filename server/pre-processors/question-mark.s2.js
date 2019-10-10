function filter(data, errorcb) {
    if (!data) return false;
    let [name, id] = data;

    if (name.includes("?")) {
        errorcb();
        return false;
    } else {
        return data;
    }
}

module.exports = {
    filter,
    name: "Question Mark Filter",
    description: "Check if name contains '?'"
}