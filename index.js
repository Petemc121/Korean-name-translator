
const nameOut = document.getElementById('nameOut');
const button = document.getElementById('button');
const hanguelConst = ["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const englishConst = ["g", "n","d","l","r","m","b","s","ng","j","ch","k","t","p","h"];
const hanguelVowels = ["ㅏ","ㅑ","ㅓ","ㅕ","ㅗ","ㅛ","ㅜ","ㅠ","ㅡ","ㅣ"];
const englishVowels = ["ah","ya","eo","yeo","oh","yoh","oo","yoo","eu","i"];
const hanguelVowels2 = ["ㅐ","ㅒ","ㅔ","ㅖ","ㅘ","ㅙ","ㅚ","ㅝ","ㅞ","ㅟ","ㅢ"];
const englishVowels2 = ["ae","ae","ae","yae","wa","wae","wi","weo","wue","wui","eui"];
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // special character regex

//click event for button

button.addEventListener('click', function() { 
    const nameIn = document.getElementById('nameIn').value
    error = false;
    
    //name input validation
    
    if (nameIn != "") {

        toString(nameIn)

        for(let i = 0; i < nameIn.length; i++) {
            
            //test if name is korean letters only
            
            if (alphabet.includes(nameIn[i]) || isNaN(nameIn[i]) == false || format.test(nameIn[i])) {
                error = true
            }
        }
        if (error == true) {
            alert("please enter korean letters only")
        }
    } else {
        alert("Please enter your korean name")
    }
    
})
