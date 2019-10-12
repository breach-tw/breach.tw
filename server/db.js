const mysql = require("promise-mysql");
const config = require("../config.json")

function debug(x) {
    if (process.env.debug) console.log("[DEBUG]", ...x);
}

function defObj(obj, def) {
    for (let [k, v] of Object.entries(def)) {
        if (obj[k] === undefined) obj[k] = v;
    }
    return obj;
}

function connect() {
    return mysql.createPool(config.db);
}

const buildGet = tableName => async (filter = ({}), con = null) => {
    if (!con) {
        con = await connect();
    }

    let data;
    let cb = data => {
        debug([`[GET ${tableName}]`, data])
        return data;
    }

    if (Object.keys(filter).length) {
        let filterDatas = [];
        let sql = `SELECT * FROM ${tableName} WHERE `;

        for (const [key, value] of Object.entries(filter)) {
            sql += "? = ? AND "
            filterDatas.push(key)
            filterDatas.push(value)
        }
        sql = sql.slice(0, -4); 
        data = await con.query(sql, filterDatas).then(cb)
    } else {
        data = await con.query(`SELECT * FROM ${tableName}`).then(cb)
    }

    return data;
}

const buildDelete = tableName => async (filter = ({}), con = null) => {
    if (!con) {
        con = await connect();
    }

    let data;
    let cb = data => {
        debug([`[DELETE ${tableName}]`, data])
        return data;
    }

    if (Object.keys(filter).length) {
        let filterDatas = [];
        let sql = `DELETE FROM ${tableName} WHERE `;

        for (const [key, value] of Object.entries(filter)) {
            sql += "? = ? AND "
            filterDatas.push(key)
            filterDatas.push(value)
        }
        sql = sql.slice(0, -4); 
        data = await con.query(sql, filterDatas).then(cb)
    } else {
        data = await con.query(`WAITFOR DELAY '00:00:00'`).then(cb)
    }

    return data;
}

const buildUpdate = tableName => async (update, filter = ({}), con = null) => {
    if (!con) {
        con = await connect();
    }

    let data;
    let cb = data => {
         debug([`[UPDATE ${tableName}]`, data])
        return data;
    }

    if (Object.keys(filter).length) {
        let filterDatas = [update];
        let sql = `UPDATE ${tableName} SET ? WHERE `;

        for (const [key, value] of Object.entries(filter)) {
            sql += "? = ? AND "
            filterDatas.push(key)
            filterDatas.push(value)
        }
        sql = sql.slice(0, -4); 
        data = await con.query(sql, filterDatas).then(cb)
    } else {
        data = await con.query(`UPDATE ${tableName} SET ?`, update).then(cb)
    }

    return data;
}

let source = {};
source.add = async function (newSource, con = null) {
    if (!con) {
        con = await connect();
    }

    defObj(newSource, {
        description: "待補",
        round_k: 0,
        comment: ""
    })
    if (newSource.major === undefined && newSource.round_k >= 5) {
        newSource.major = 1;
    }
    if (newSource.id !== undefined) {
        newSource.id = undefined;
    }

    let insertId = await con.query("INSERT INTO breach_source SET ?", newSource)
        .then(data => {
             debug(['[INSERT SOURCE]', data])
            return data.insertId
        });
    return insertId;
}

source.get = buildGet('breach_source')
source.delete = buildDelete('breach_source')
source.update = buildUpdate('breach_source')

source.addItem = async function (sourceId, itemId, con = null) {
    if (!con) {
        con = await connect();
    }

    if (Array.isArray(itemId)) {
        return await Promise.all(itemId.map(x => source.addItem(sourceId, x, con)))
    }

    let insertId = await con.query("INSERT INTO source_item SET ?", {
            source: sourceId,
            item: itemId
        })
        .then(data => {
             debug(['[INSERT SOURCE ITEM]', data])
            return data.insertId
        });

    return insertId;
}

source.getItem = buildGet('source_item')
source.deleteItem = buildDelete('source_item')
source.updateItem = buildUpdate('source_item')

let log = {};
log.add = async function (hash, sourceId, con = null) {
    if (!con) {
        con = await connect();
    }

    let insertId = await con.query("INSERT INTO breach_log SET ?", {
        hash,
        source: sourceId
    }).then(data => {
         debug(['[INSERT LOG]', data]);
        return data.insertId
    })
    return insertId;
}

log.get = buildGet('breach_log')
log.delete = buildDelete('breach_log')
log.update = buildUpdate('breach_log')
log.batch = {};
log.batch.add = async function (datas, con = null) {
    if (!con) {
        con = await connect();
    }
    let SQL = "INSERT INTO breach_log (hash, source) VALUES ";
    for (let i = 0; i < datas.length / 2; i++){
        if (i != 0) SQL += ', '
        SQL += "(?, ?)"
    }
    let insertId = await con.query(SQL, datas).then(data => {
         debug(['[INSERT BATCH LOG]', data]);
        return data.insertId
    })
    return insertId;
}

let item = {};
item.get = buildGet('breach_item')
item.delete = buildDelete('breach_item')
item.update = buildUpdate('breach_item')
item.add = async function (id, name, abbr, con = null) {
    if (!con) {
        con = await connect();
    }

    let insertId = await con.query("INSERT INTO breach_item SET ?", {
        id,
        name,
        abbr
    }).then(data => {
        debug(['[INSERT ITEM]', data]);
        return data.insertId
    })
    return insertId;
}

module.exports = {
    connect,
    source,
    item,
    log
}
