
const hanguelConst = ["ㄱ", "ㄴ", "ㄷ", "ㅁ", "ㅂ", "ㅅ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㄹ", "ㅇ"];
const englishConst = ["g", "n", "d", "m", "b", "s", "j", "ch", "k", "t", "p", "h", "l", "r", "ng", ""];
const hanguelVowels = ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ","ㅐ", "ㅒ", "ㅔ", "ㅖ",];
const englishVowels = ["a", "ya", "eo", "yeo", "o", "yo", "u", "yu", "eu", "i","ae","yae","ae","yae"];
const hanguelVowels2 = ["ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"];
const englishVowels2 = ["wa", "wae", "wi", "weo", "wue", "wui", "eui"];
const button = document.getElementById('button');
const output= document.getElementById('output');
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
           

        }
    } else {
        alert("Please enter your korean name")
    }

})

// function to convert each Korean letter into an english letter 

function korToEng(input) {

    engName = []

    for (var i = 0; i < input.length; i++) {

        if (hanguelConst.includes(input[i])) {

            letterConst = mapConst(input[i]);

            if (letterConst === false) {
                if (input[i] === "ㅇ") {
                    if (hanguelVowels.includes(input[i + 1])) {
                       engName = engName;
                    } else {
                        engName.push('ng');
                    }
                } else if (input[i] === "ㄹ") {
                    if (i == 0) {
                        engName.push('R');
                    } else if (hanguelVowels.includes(input[i - 1])) {
                        engName.push('r');
                    } else {
                        engName.push('l');
                    }
                }
            } else {
                engName.push(letterConst);
              
            }

        } else if (hanguelVowels.includes(input[i])) {
                if (input[i] === "ㅗ") {
                    if(input[i+1] === "ㅏ") {
                        engName.push("wa");

                    } else 
                    if(input[i+1] === "ㅐ") {
                        engName.push("wae");
                    } else
                    if(input[i+1] === "ㅣ") {
                        engName.push("wi");
                    } else {
                        letterVowel = mapVowel(input[i]);
                        engName.push(letterVowel);
                    }
                } else
                if (input[i] === "ㅜ") {
                    if(input[i+1] === "ㅓ") {
                        engName.push("weo");

                    } else 
                    if(input[i+1] === "ㅔ") {
                        engName.push("wae");
                    } else
                    if(input[i+1] === "ㅣ") {
                        engName.push("wi");
                    } else {
                        letterVowel = mapVowel(input[i]);
                        engName.push(letterVowel);
                    }
                } else 
                if (input[i] === "ㅡ") {
                    if(input[i+1] === "ㅣ") {
                        engName.push("eui");
                    } else {
                        letterVowel = mapVowel(input[i]);
                        engName.push(letterVowel);
                    }

                } else {
                    letterVowel = mapVowel(input[i]);
                    engName.push(letterVowel);
                    }
        } 
    }

   finalName = engName.join("")
    output.innerHTML = finalName;
}

//function to convert letters exluding "ㅇ" and "ㄹ" (these symbols convert to more than one english symbol depending on their position)

function mapConst(letter) {

    if (letter != "ㅇ" && letter != "ㄹ") {
        position = hanguelConst.indexOf(letter)

        newletter = englishConst[position];
        return newletter

    } else {
        return false
    }
}

function mapVowel(letter) {

        position = hanguelVowels.indexOf(letter)

        newletter = englishVowels[position];
        return newletter

}
