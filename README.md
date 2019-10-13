# 台灣抓漏小天使 Breach.tw

## 服務內容
A service that can track data breaches like "Have I Been Pwned", but it is specific for Taiwan.
本產品提供台灣（中華民國）之個資外洩事件查詢及追蹤服務。
讓使用者了解自己是否存在於重大資安外洩事件清單中，且增加使用者之資訊安全素養。

## 開發動機
1. 本作品為教育部資訊安全人才培育計畫 108年度新型態資安暑期課程 AIS3 2019 資安實務專題競賽之產物。
2. 為什麼想寫這個網站？
看到 2019 年 7、8 月連續有大量的個資外洩事件被報導出來，  
大多數機構也並不會主動通知使用者個資外洩事件，  
故想出了利用單向去識別化的方法幫助使用者確認自己是否在影響範圍內。  
希望台灣的資訊安全觀念可以更進一步的提升，被洩露資訊的單位也能向主管機關以及使用者通報。  
在 2018 年國泰航空的外洩事件中，很不幸的，我中獎了。  
但是公司主動通知使用者，並提供 Experian IdentityWorks 個人資料追蹤系統的使用權的做法讓我感到很欣慰，  
希望台灣的機構也能效法，讓所有人為了個人資料的保護盡一份心力。  
3. 主要想法構思來自 [Have I Been Pwned](https://haveibeenpwned.com/) 以及 Experian IdentityWorks 兩個網站。

## 技術細節
由於依據[我國個人資料保護法](https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021)所規定之個資搜集方法過於繁雜，故使用 SHA-1 雜湊函數將姓名及身分證字號去識別化後回傳主機，亦可避免開發者暗中搜集使用者個資，提升使用者對本產品的信任。

本網站資料來源皆為匿名人士提供，且本網站並不保存其原始資料，只保存雜湊值以便查詢洩漏情況。
攻擊本網站並無法獲得資料，且本網站保留法律追訴權。

若想匿名提供資源，可聯絡 [admin@breach.tw](mailto:admin@breach.tw)，建議使用 PGP Key [C49D4040](https://pgp.key-server.io/pks/lookup?op=get&fingerprint=on&search=0xF85EC40BC49D4040) 進行加密。

## 其他連結
[Facebook Page](https://www.facebook.com/breach.tw/)
