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
    name: "A123456789 Filter",
    description: "Too many testing data using this...."
}