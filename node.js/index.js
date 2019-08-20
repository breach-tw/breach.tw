const crypto = require("crypto");
const axios = require('axios');
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = x => new Promise((resolve, reject) => rl.question(x, resolve))

class PoW{
    constructor(data, bit = "a", diff = 5){
        this.data = data;
        this.bit = bit;
        this.diff = diff;

        this.__nonce = {
            valid: false,
            data: 0
        }
    }

    __sha1(data) {
        return crypto.createHash("sha1").update(data, "utf8").digest("hex");
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

async function main(){
    const questions = [{
        type: 'input',
        name: 'name',
        message: "Please input your name: ",
      }, {
        type: 'input',
        name: 'id',
        message: "Please input your National ID: ",
      }]
    const name = await question("Please input your name: ");
    const id = await question("Please input your National ID: ");

    const input = name + id
    const test = new PoW(crypto.createHash("sha1").update(input, "utf8").digest("hex"))
    console.log("Original data: ", input)
    console.log("data: ", test.data)
    console.log("nonce: ", test.nonce)
    console.log("hash: ", test.resultHash);

    const data = await axios.get(`https://breach.tw/api/search.php?mode=pow&hash=${test.data}&nonce=${test.nonce}`);
    console.log("\n")
    console.log("result: ", data.data)
    process.exit()
}

main();
