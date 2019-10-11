<?php
class PoW {
    private $data;
    private $bit;
    private $diff;
    private $nonce = array(
        "data" => 0,
        "valid" => false
    );
    
    public function __construct($data, $bit="a", $diff=5) {
        $this->data = $data;
        $this->bit = $bit;
        $this->diff = $diff;
    }
    
    public function __get($name) {
        switch ($name) {
            case "nonce":
                if ($this->nonce["valid"]) {
                    return $this->nonce["data"];
                } else {
                    while (!$this->nonce["valid"]) {
                        if (substr(sha1($this->data . $this->nonce["data"]), 0, $this->diff) == str_repeat($this->bit, $this->diff)) {
                            $this->nonce["valid"] = true;
                            return $this->nonce["data"];
                        } else {
                            $this->nonce["data"] += 1;
                        }
                    }
                }
                break;
            case "hash":
                return sha1($this->data . $this->nonce["data"]);
                break;
            default:
                return $this->$name;
                break;
        }
    }
}

$name = readline("Name: ");
$id = readline("ID: ");

$data = $name.$id;

$test = new PoW(sha1($name.$id));

echo "Original data: " . $data . "\n";
echo "data: " . $test->data . "\n";
echo "nonce: " . $test->nonce . "\n";
echo "hash: " . $test->hash . "\n";

$result = file_get_contents("https://breach.tw/api/search.php?mode=pow&hash={$test->data}&nonce={$test->nonce}");

echo "\n" . $result . "\n";