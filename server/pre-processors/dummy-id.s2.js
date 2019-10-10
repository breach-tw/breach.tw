function filter(data) {
    if (!data) return false;
    let [name, id] = data;

    if (id == "A123456789") {
        return false;
    } else {
        return data;
    }
}

module.exports = {
    filter,
    name: "Dummy ID Filter",
    subscription: "Check if ID is A123456789"
}