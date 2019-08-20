const crypto = require("crypto");
const axios = require('axios');
const inquirer = require('inquirer')

class PoW{
    constructor(data, bit = "a", diff = 5){
        this.data = data;
        this.bit = bit;
        this.diff = diff;
    }

    __nonce = {
        valid: false,
        data: 0
    }

    __sha1(data) {
        return crypto.createHash("sha1").update(data, "binary").digest("hex");
    }
    

    get nonce(){
        if (this.__nonce.valid) return this.__nonce.data;
        else {
            while(!this.__nonce.valid) {
                if (this.__sha1(this.data + this.__nonce.data.toString()).startsWith(this.bit.repeat(this.diff))) {
                    this.__nonce.valid = true;
                    return this.__nonce.data;
                } else {
                    this.__nonce.data++;
                }
            }
        }
    }

    get resultHash(){
        return this.__sha1(this.data + this.__nonce.data.toString());
    }

}

function main(){
    const questions = [{
        type: 'input',
        name: 'name',
        message: "Please input your name: ",
      }, {
        type: 'input',
        name: 'id',
        message: "Please input your National ID: ",
      }]
    
    inquirer.prompt(questions)
        .then(answers => {
            const input = answers.name + answers.id
            const test = new PoW(crypto.createHash("sha1").update(input, "utf8").digest("hex"))
            console.log("Original data: ", input)
            console.log("data: ", test.data)
            console.log("nonce: ", test.nonce)
            console.log("hash: ", test.resultHash);
            return test
      })
        .then(pow => axios.get(`https://breach.tw/api/search.php?mode=pow&hash=${pow.data}&nonce=${pow.nonce}`))
        .then(data => {
            console.log("\n")
            console.log("result: ", data.data)
        })
}

main();
