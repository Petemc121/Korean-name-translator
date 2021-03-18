
const hanguelConst = ["ㄱ", "ㄴ", "ㄷ", "ㅁ", "ㅂ", "ㅅ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㄹ", "ㅇ"];
const englishConst = ["g", "n", "d", "m", "b", "s", "j", "ch", "k", "t", "p", "h", "l", "r", "ng", ""];
const hanguelVowels = ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ"];
const englishVowels = ["a", "ya", "eo", "yeo", "o", "yo", "u", "yu", "eu", "i"];
const hanguelVowels2 = ["ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"];
const englishVowels2 = ["ae", "ae", "ae", "yae", "wa", "wae", "wi", "weo", "wue", "wui", "eui"];
const button = document.getElementById('button');
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // special character regex


//click event for button

button.addEventListener('click', function () {
    const nameIn = document.getElementById('nameIn').value
    const nameOut = document.getElementById('output').value

    error = false;

    //name input validation

    if (nameIn != "") {

        toString(nameIn)

        for (let i = 0; i < nameIn.length; i++) {

            //test if name is korean letters only

            if (alphabet.includes(nameIn[i]) || isNaN(nameIn[i]) == false || format.test(nameIn[i])) {
                error = true
            }
        }
        if (error == true) {
            alert("please enter korean letters only")
        } else {

            // this is A function built into hangeul.js, a library that disects Korean letters into their separated symbols

            disassemble = Hangul.disassemble(nameIn);
            console.log(disassemble);
            conReturn = korToEng(disassemble);
            console.log(conReturn)



        }
    } else {
        alert("Please enter your korean name")
    }

})

// function to convert each Korean letter into an english letter 

function korToEng(input) {

    engName = [];

    for (var i = 0; i < input.length; i++) {

        if (hanguelConst.includes(input[i])) {

            letterTest = mapConst(input[i]);

            if (letterTest == false) {
                if (input[i] == "ㅇ") {
                    if (hangeulVowels.includes(input[i + 1])) {
                        let engLetter = "";
                        return engLetter
                    } else {
                        return "ng";
                    }
                } else if (input[i] == "ㄹ") {
                    if (input[i] == input[0]) {
                        return "R"
                    } else if (hangeulVowels.includes(input[i - 1])) {
                        return "r"
                    } else {
                        return "l"
                    }
                }
            }

        }
    }
}

//function to convert letters exluding "ㅇ" and "ㄹ" (these symbols convert to more than one english symbol depending on their position)

function mapConst(letter) {

    if (letter != "ㅇ" || letter != "ㄹ") {
        position = hanguelConst.indexOf(letter)

        newletter = englishConst[position];
        return newletter

    } else {
        return false
    }
}
