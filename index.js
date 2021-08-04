const button = document.getElementById("button");
const output = document.getElementById("output");
const drumRoll = document.getElementById("drumRoll")

const hanguelConst = [
  "ㄴ",
  "ㄷ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
  "ㄱ",
  "ㄹ",
  "ㅇ",
];

const englishConst = [
  "n",
  "d",
  "m",
  "b",
  "s",
  "j",
  "ch",
  "k",
  "t",
  "p",
  "h",
  "g",
  "l",
  "r",
  "ng",
  "",
];
const hanguelVowels = [
  "ㅏ",
  "ㅑ",
  "ㅓ",
  "ㅕ",
  "ㅗ",
  "ㅛ",
  "ㅜ",
  "ㅠ",
  "ㅡ",
  "ㅣ",
  "ㅐ",
  "ㅒ",
  "ㅔ",
  "ㅖ",
];
const englishVowels = [
  "a",
  "ya",
  "eo",
  "yeo",
  "o",
  "yo",
  "u",
  "yu",
  "eu",
  "i",
  "ae",
  "yae",
  "ae",
  "yae",
];

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const hanguelDoubleConst = ["ㄸ", "ㅃ", "ㅆ", "ㅉ", "ㄲ"];

const englishDoubleConst = ["dd", "bb", "ss", "jj", "gg"];

const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // special character regex

//click event for button

button.addEventListener("click", function () {
  const nameIn = document.getElementById("nameIn").value;
  const nameOut = document.getElementById("output").value;

  error = false;

  //name input validation

  if (nameIn != "") {
    toString(nameIn);

    for (let i = 0; i < nameIn.length; i++) {
      //test if name is korean letters only

      if (
        alphabet.includes(nameIn[i]) ||
        isNaN(nameIn[i]) == false ||
        format.test(nameIn[i])
      ) {
        error = true;
      }
    }
    if (error == true) {
      alert("please enter korean letters only");
    } else {
      // this is A function built into hangeul.js, a library that disects Korean letters into their separated symbols

      disassemble = Hangul.d(nameIn, true);
      console.log(disassemble);
      conReturn = korToEng(disassemble);
    }
  } else {
    alert("Please enter your korean name");
  }
});

// function to convert each Korean letter into an english letter

function korToEng(input) {
  engName = [];
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input[i].length; j++) {
      if (hanguelConst.includes(input[i][j])) {
        letterConst = mapConst(input[i][j]);

        if (letterConst === false) {
          if (i === input.length - 1 && j === input[i].length - 1) {
            if (input[i][j] === "ㅇ") {
              engName.push("ng");
            }
          } else {
            if (input[i][j] === "ㅇ") {
              if (
                hanguelVowels.includes(input[i][j + 1]) ||
                hanguelVowels.includes(input[i + 1][0])
              ) {
                engName = engName;
              } else {
                engName.push("ng");
              }
            } else if (input[i][j] === "ㄹ") {
              if (j == 0) {
                engName.push("R");
              } else if (hanguelVowels.includes(input[i][j - 1])) {
                engName.push("r");
              } else {
                engName.push("l");
              }
            } else if (input[i][j] == "ㄱ") {
              if (j == 0) {
                engName.push("K");
              } else {
                engName.push("g");
              }
            }
          }
        } else {
          engName.push(letterConst);
        }
      } else if (hanguelDoubleConst.includes(input[i][j])) {
        if (i === input.length - 1 && j === input[i].length - 1) {
          if (input[i][j] == "ㅆ") {
            engName.push("t");
          } else if (input[i][j] == "ㄸ") {
            engName.push("t");
          } else if (input[i][j] == "ㅃ") {
            engName.push("pp");
          } else if (input[i][j] == "ㅉ") {
            engName.push("t");
          } else if (input[i][j] == "ㄲ") {
            engName.push("k");
          }
        } else {
          if (
            hanguelConst.includes(input[i][j + 1]) ||
            hanguelConst.includes(input[i + 1][0])
          ) {
            if (input[i][j + 1] == "ㅇ" || input[i + 1][0] == "ㅇ") {
              doubleConst = mapDoubleConst(input[i][j]);
              engName.push(doubleConst);
            } else {
              if (input[i][j] == "ㅆ") {
                engName.push("t");
              } else if (input[i][j] == "ㄸ") {
                engName.push("t");
              } else if (input[i][j] == "ㅃ") {
                engName.push("pp");
              } else if (input[i][j] == "ㅉ") {
                engName.push("t");
              } else if (input[i][j] == "ㄲ") {
                engName.push("k");
              }
            }
          } else {
            doubleConst = mapDoubleConst(input[i][j]);
            engName.push(doubleConst);
          }
        }
      } else if (hanguelVowels.includes(input[i][j])) {
        if (input[i][j] === "ㅗ") {
          if (input[i][j + 1] === "ㅏ") {
            engName.push("w");
          } else if (input[i][j + 1] === "ㅐ") {
            engName.push("w");
          } else if (input[i][j + 1] === "ㅣ") {
            engName.push("o");
          } else {
            letterVowel = mapVowel(input[i][j]);
            engName.push(letterVowel);
          }
        } else if (input[i][j] === "ㅜ") {
          if (input[i][j + 1] === "ㅓ") {
            engName.push("w");
          } else if (input[i][j + 1] === "ㅔ") {
            engName.push("w");
          } else if (input[i][j + 1] === "ㅇ") {
            engName.push("woo");
          } else {
            letterVowel = mapVowel(input[i][j]);
            engName.push(letterVowel);
          }
        } else if (input[i][j] === "ㅡ") {
          if (input[i][j + 1] === "ㅣ") {
            engName.push("eu");
          } else {
            letterVowel = mapVowel(input[i][j]);
            engName.push(letterVowel);
          }
        } else {
          letterVowel = mapVowel(input[i][j]);
          engName.push(letterVowel);
        }
      }
    }
    engName.push(" ");
  }
  finalName = engName.join("");
  drumRollPlease();
  outputName(finalName);
}

//function to convert letters exluding "ㅇ" and "ㄹ" (these symbols convert to more than one english symbol depending on their position)

function mapConst(letter) {
  if (letter != "ㄱ" && letter != "ㅇ" && letter != "ㄹ") {
    position = hanguelConst.indexOf(letter);

    newletter = englishConst[position];
    return newletter;
  } else {
    return false;
  }
}

function mapDoubleConst(letter) {
  position = hanguelDoubleConst.indexOf(letter);

  newletter = englishDoubleConst[position];
  return newletter;
}

function mapVowel(letter) {
  position = hanguelVowels.indexOf(letter);

  newletter = englishVowels[position];
  return newletter;
}

function outputName(name) {
  setTimeout(() => {
    output.textContent = name;
  }, 1300);
}

function drumRollPlease() {
  drumRoll.style.display = "block"
  setTimeout(() => {
    drumRoll.style.display = "none";
  }, 1300);
}