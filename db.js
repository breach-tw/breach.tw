const mysql = require("promise-mysql");
const config = require("./config.json")

function debug(x){
    console.log("[DEBUG]", x);
}

function defObj(obj, def){
    for(let [k, v] of Object.entries(def)){
        if (obj[k] === undefined) obj[k] = v;
    }
    return obj;
}

function connect(){
    return mysql.createPool(config.db);
}

let source = {};
source.add = async function(newSource, con = null){
    if (!con) {
        con = await connect();
    }

    defObj(newSource, {
        description: "待補",
        round_k: 0
    })
    if (newSource.major === undefined && newSource.round_k > 5){
        newSource.major = 1;
    }

    let insertId = await con.query("INSERT INTO breach_source SET ?", newSource)
        .then(data => {
            if (config.debug) debug(data)
            return data.insertId
        });
    return insertId;
}
source.addItem = async function(sourceId, itemId, con = null){
    if(!con){
        con = await connect();
    }

    if (Array.isArray(itemId)){
        return await Promise.all(itemId.map(x => source.addItem(sourceId, x, con)))
    }

    let insertId = await con.query("INSERT INTO source_item SET ?", {
        source: sourceId,
        item: itemId
    })
    .then(data => {
        if (config.debug) debug(data)
        return data.insertId
    });

    return insertId;
}

let log = {};
log.add = async function(hash, sourceId, con = null){
    if (!con) {
        con = await connect();
    }

    let insertId = await con.query("INSERT INTO breach_log SET ?", {
        hash,
        source: sourceId
    }).then(data => {
        if (config.debug) debug(data);
        return data.insertId
    })
    return insertId;
}

module.exports = {
    connect,
    source,
    log
}