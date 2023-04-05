function addBracketsAndDash(str) {
    if (str.length === 3) {
        let stringify = str.toString();
        let newStr = `(${stringify})-`;
        return newStr;
    }
}

function addSecondDash(str) {
    if (str.length === 9) {
        let newStr = `${str}-`
        return newStr;
    }
}

function checkForNumber(str) {
    let validCharacters = ['(', ')', '-'];
    let i = 0;
   
    while (i < str.length) {
        if (isNaN(parseInt(str[i])) && validCharacters.indexOf(str[i]) === -1 ) {
            return 'wrong o';
            //alert('Please provide a valid phone number');
        } else {
            i++
        }
    }
}


function checkPhoneFormat(str) {
if (str.length === 14) {
    if(str[0] === "(" && str[4] === ")" && str[5] === "-" && str[9] === "-") {
        return 'valid'
    } else {
        return 'invalid';
    }
} else if(str.length === 10) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        newStr += str[i];

         if (newStr.length === 3) {
            newStr = addBracketsAndDash(newStr);

        } else if(newStr.length === 9) {
            newStr = addSecondDash(newStr);
        }
    }
    return newStr;

}
}

function formatFullPhoneNumber(str){
    let array = str.split('');
    let firstThree = array.slice(0, 3).join('').toString();
    let secondThree = array.slice(3, 6).join('').toString();
    let finalFour = array.slice(6).join('').toString();
    let formattedPhone = `(${firstThree})-${secondThree}-${finalFour}`;
    return formattedPhone;
}

function setPhoneNumber(str) {
    let formattedArray = ['(', '', '', '', ')', '-', '', '', '', '-', '', '', '', ''];
    let arrayOfStr = str.split('');

    for (let i = 0; i < formattedArray.length; i++) {
        if (formattedArray[i] === '' && arrayOfStr.length > 0) {
            formattedArray[i] = arrayOfStr[0];
            arrayOfStr.splice(0, 1);
        }
    }

    return formattedArray.join(' ').toString();
}


console.log(addBracketsAndDash(814));

console.log(addSecondDash('(814)-371'));

console.log(checkPhoneFormat('(814)-371-9482'));
console.log(checkPhoneFormat('(814)-3719482-'));

console.log(checkPhoneFormat('8146712189'));

console.log(checkForNumber('fdfdsaf81'));
console.log(checkForNumber('81456789'));
console.log(formatFullPhoneNumber('8143712141'));

console.log(setPhoneNumber('814'));
console.log(setPhoneNumber('814657'));
console.log(setPhoneNumber('8146571245'));
