function filter(data) {
    if (!data) return false;
    let [name, id] = data;

    if (name.includes("?")) {
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