function filter(data, errorcb) {
    if (!data) return false;
    let [name, id] = data;
    if (name.match(/[A-Za-züé]/)) {  
        errorcb()
        return false;
    }

    return data;
}

module.exports = {
    filter,
    name: "Name English Filter",
    description: "If there is English character in the name, then filter it out."
}