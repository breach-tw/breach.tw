#include <iostream>
#include <string>
#include <clocale>
#include "src/sha1/sha1.h"
#include "src/httplib/httplib.h"

class PoW{
    private:
        std::string _data;
        std::pair<unsigned long long, bool> _nonce = std::make_pair(0, false); // [data, valid]
        char bit = 'a';
        int diff = 5;


    public:
        PoW(std::string& data, char bit = 'a', int diff = 5){
            this->_data = data;
            this->bit = bit;
            this->diff = diff;
        }

        std::string data(){
            return this->_data;
        }

        unsigned long long nonce(){
            if (this->_nonce.second){
                return this->_nonce.first;
            } else {
                while(!this->_nonce.second){
                    if (sha1(this->_data + std::to_string(this->_nonce.first)).substr(0, this->diff) == std::string(this->diff, this->bit)){
                        this->_nonce.second = true;
                        return this->_nonce.first;
                    } else {
                        this->_nonce.first++;
                    }
                }
            }
        }

        std::string resultHash(){
            return sha1(this->_data + std::to_string(this->_nonce.first));
        }
};

int main(){
    std::setlocale(LC_ALL, "C.UTF-8");

    std::string name, id;
    std::cout << "Please input your name: ";
    std::flush(std::cout);
    std::cin >> name;
    std::cout << "Please input your National ID: ";
    std::flush(std::cout);
    std::cin >> id;

    std::string orgInput = name + id;
    std::string orgInputHash = sha1(orgInput);
    auto test = PoW(orgInputHash);

    std::cout << "Original data: " << orgInput << '\n'
              << "data: " << test.data() << '\n'
              << "nonce: " << test.nonce() << '\n'
              << "hash: " << test.resultHash() << '\n'
              << std::endl;

    httplib::Client cli("breach.tw");

    auto res = cli.Get(
            (
                "/api/search.php?mode=pow&hash=" 
                + test.data() 
                + "&nonce=" 
                + std::to_string(test.nonce())
            ).c_str()
        );
    if (res && res->status == 200) {
        std::cout << "result: " << res->body << std::endl;
    }
    return 0;
}