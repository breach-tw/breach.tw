let tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"                     
let A1 = new Array (1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3 );
let A2 = new Array (0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5 );
let Mx = new Array (9,8,7,6,5,4,3,2,1,1);

function isValid(id) {
    if (id.length != 10 ) return false;
    
    let i = tab.indexOf(id[0]);
    
    if (i === -1) {
        return false;
    }

    let sum = A1[i] + A2[i] * 9;
    for ( i = 1; i < 10; i++ ) {
      let v = parseInt( id[i] );
      if ( isNaN(v) ) return false;
      sum += v * Mx[i];
    }
    
    return sum % 10 == 0;
}

function filter(data, errorcb) {
    if (!data) return false;
    let [name, id] = data;

    if (isValid(id)) {
        return data;
    } else {
        errorcb()
        return false;
    }
}

module.exports = {
    filter,
    name: "ID Validator",
    description: "Check if ID is valid."
}