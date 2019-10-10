function filter(data, errorcb) {
    if (!data) return false;
    let [name, id] = data;

    if (id == "A123456789") {
        errorcb()
        return false;
    } else {
        return data;
    }
}

module.exports = {
    filter,
    name: "Dummy ID Filter",
    description: "Check if ID is A123456789"
}