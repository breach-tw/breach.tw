const mysql = require("promise-mysql");
//const config = require("./config.json")
const config = {
    "db": {
        "host" : process.env.DB_HOST,
        "account": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME
    },
    "debug": process.env.DEBUG
}

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

const buildGet = tableName => async(filter = ({}), con = null) => {
    if(!con){
        con = await connect();
    }

    let data;
    let cb = data => {
        if (config.debug) debug(data)
        return data;
    }

    if (Object.keys(filter).length) {
        data = await con.query(`SELECT * FROM ${tableName} WHERE ?`, filter).then(cb)
    } else {
        data = await con.query(`SELECT * FROM ${tableName}`).then(cb)
    }

    return data;
}

const buildDelete = tableName => async(filter = ({}), con = null) => {
    if(!con){
        con = await connect();
    }

    let data;
    let cb = data => {
        if (config.debug) debug(data)
        return data;
    }

    if (Object.keys(filter).length) {
        data = await con.query(`DELETE FROM ${tableName} WHERE ?`, filter).then(cb)
    } else {
        data = await con.query(`DELETE FROM ${tableName}`).then(cb)
    }

    return data;
}

const buildUpdate = tableName => async(update, filter = ({}), con = null) => {
    if(!con){
        con = await connect();
    }

    let data;
    let cb = data => {
        if (config.debug) debug(data)
        return data;
    }

    if (Object.keys(filter).length) {
        data = await con.query(`UPDATE ${tableName} SET ? WHERE ?`, [update, filter]).then(cb)
    } else {
        data = await con.query(`UPDATE ${tableName} SET ?`, update).then(cb)
    }

    return data;
}

let source = {};
source.add = async function(newSource, con = null){
    if (!con) {
        con = await connect();
    }

    defObj(newSource, {
        description: "待補",
        round_k: 0,
        comment: ""
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

source.get = buildGet('breach_source')
source.delete = buildDelete('breach_source')
source.update = buildUpdate('breach_source')

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

source.getItem = buildGet('source_item')
source.deleteItem = buildDelete('source_item')
source.updateItem = buildUpdate('source_item')

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

log.get = buildGet('breach_log')
log.delete = buildDelete('breach_log')
log.update = buildUpdate('breach_log')

module.exports = {
    connect,
    source,
    log
}