const rawInput1 = "APP0192|   ngUYen   vAn  A |0987654321|15/10/2026 08:30|BS.Tran_B-Khoa_Noi";
const rawInput2 = "APP0193|le  thi   b|0912|16/10/2026 09:00|";
const rawInput3 = "APP0194|Vo Van C|0901112223|17/10/2026 10:00|";

function toTitleCase(str) {
    let cleanStr = str.trim()
    let words = cleanStr.split(" ");

    let result = [];

    for(let i =0; i< words.length; i++){
        let word = words[i];
        if (word !== ""){
            let firstLetter = word.slice(0,1).toUpperCase()
            let restOfWord = word.slice(1).toLowerCase()
            let formattedWord = firstLetter + restOfWord;
            result.push(formattedWord);
        }
    }
    return result.join(" ");
}

function maskPhone(str){
    let cleanPhone = str.trim()
    if(cleanPhone.length < 9){
        return "Invalid"
    }
    let start = cleanPhone.slice(0,3);
    let end = cleanPhone.slice(6);
    return start + "***" + end

}

function formatDoctor(str){
    if (str === "" || str === undefined){
        return "Bac si chuyen khoa"
    }
    formatted = str.replaceAll("_"," ");
    formatted = formatted.replace("-"," - ");
    return formatted
}

function generateSMS(rawData){
    let parts = rawData.split("|")
    Id = parts[0];
    userName = toTitleCase(parts[1]);
    phoneNumber = maskPhone(parts[2]);
    time = parts[3];
    doctor = formatDoctor(parts[4])

    if (phoneNumber === "Invalid"){
        return `[Lỗi hệ thống] Không thể tạo SMS cho mã ${Id} do sđt không hợp lệ`;
    }
    let smsText = `kinh chao ${userName}, ban co lich kham ma ${Id} luc ${time} cung ${doctor}. Vui long den truoc 15p`
    if (smsText.length > 160){
        smsText = `kinh chao ${userName}, ban co lich kham ma ${Id} luc ${time}. Vui long den truoc 15p`
    }
    return smsText
}

console.log(generateSMS(rawInput1));
console.log(generateSMS(rawInput2));
console.log(generateSMS(rawInput3));
