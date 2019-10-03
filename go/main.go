package main

import (
	"fmt"
	"strings"
	"crypto/sha1"
	"encoding/hex"
	"io/ioutil"
	"net/http"
)

func hashSHA1(s string) string {
	h := sha1.New()
	h.Write([]byte(s))
	
	return hex.EncodeToString(h.Sum(nil))
}

func calcNonce(data string, bit string, diff int,  nonce int) int {
	for hashSHA1(fmt.Sprintf("%s%d", data, nonce))[0:diff] != strings.Repeat(bit, diff) {
		nonce++
	}
	return nonce
}

func request(nonce int, hash string) string {
	resp, err := http.Get(fmt.Sprintf("https://breach.tw/api/search.php?mode=pow&hash=%s&nonce=%d", hash, nonce))
	if err != nil {
		return err.Error()
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err.Error()
	}
	return string(body)
}

func main() {
	var name, id string
	fmt.Printf("Name: ")
	fmt.Scanln(&name)
	fmt.Printf("ID: ")
	fmt.Scanln(&id)

	data := name + id

	hashed := hashSHA1(data)
	nonce := calcNonce(hashed, "a", 5, 0)

	result := hashSHA1(fmt.Sprintf("%s%d", hashed, nonce))

	fmt.Println()
	fmt.Println("Original data: ", data)
	fmt.Println("data: ", hashed)
	fmt.Println("nonce: ", nonce)
	fmt.Println("hash: ", result)
	fmt.Println()
	fmt.Println(request(nonce, hashed))
}