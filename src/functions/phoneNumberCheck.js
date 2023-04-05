const PhoneNumberCheck = {

    addBracketsAndDash: (str) => {
        if (str.length === 3 && str[0] !== "(") {
            let newStr = `(${str})-`;
            return newStr;
        }
    },

    addSecondDash: (str) => {
        if (str.length === 9) {
            let newStr = `${str}-`
            return newStr;
        }
    },

    checkForNumber: (str) => {
        const validCharacters = ['(', ')', '-'];

        if (isNaN(parseInt(str)) && validCharacters.indexOf(str) === -1) {
            return false;
        } else {
            return true;
        }

    },

    formatFullPhoneNumber: (str) => {
        let array = str.split('');
        let firstThree = array.slice(0, 3).join('').toString();
        let secondThree = array.slice(3, 6).join('').toString();
        let finalFour = array.slice(6).join('').toString();
        let formattedPhone = `(${firstThree})-${secondThree}-${finalFour}`;
        return formattedPhone;
    },



    checkPhoneFormat: (str) => {
        if (str.length === 14) {
            if (str[0] === "(" && str[4] === ")" && str[5] === "-" && str[9] === "-") {
                return str;
            } else {
                alert('invalid phone number');
            }
        } /*else if (str.length === 10 && str[0] !== '(' && str[4] !== ')' && str[5] !== "-" && str[9] !== '-') {
            let array = str.split('');
            let firstThree = array.slice(0, 3).join('').toString();
            let secondThree = array.slice(3, 6).join('').toString();
            let finalFour = array.slice(6).join('').toString();
            let formattedPhone = `(${firstThree})-${secondThree}-${finalFour}`;
            return formattedPhone;
        } else {
            return str + input.value;
        }*/
        else {
            return str;
        }
    },

    previousLength: 0,

    checkLength: (str) => {
        if (str) {

            if (str.length > PhoneNumberCheck.previousLength) {
                if (PhoneNumberCheck.checkForNumber(str[str.length - 1])) {
                    if (str && str.length === 3) {
                        let currentString = PhoneNumberCheck.addBracketsAndDash(str);
                        PhoneNumberCheck.previousLength = currentString.length;
                        return currentString;
                    } else if (str && str.length === 9) {
                        let currentString = PhoneNumberCheck.addSecondDash(str);
                        PhoneNumberCheck.previousLength = currentString.length;
                        return currentString;
                    } else if (str && str.length > 10) {
                        let currentString = PhoneNumberCheck.checkPhoneFormat(str);
                        PhoneNumberCheck.previousLength = currentString.length;
                        return currentString;
                    } else if (str) {
                        PhoneNumberCheck.previousLength = str.length;
                        return str;
                    } else {
                        return;
                    }
                } else {
                    alert('Please provide a valid phone number');
                    return '';
                }
            } else {
                PhoneNumberCheck.previousLength = str.length;
                return str;
            }
        }
    },

    phoneSetUp: ['(', '', '', '', ')', '-', '', '', '', '-', '', '', '', ''],

    returnNumbers: (str) => {
        let finalStr = '';
        for (let i = 0; i < str.length; i++) {
            if (!isNaN(parseInt(str[i]))) {
                finalStr += str[i];
            }
        }
        return finalStr;
    },

    setPhoneNumber: (str) => {
        if (str) {
        str = PhoneNumberCheck.returnNumbers(str);
        PhoneNumberCheck.phoneSetUp = ['(', '', '', '', ')', '-', '', '', '', '-', '', '', '', ''];
        let arrayOfStr = str.split('');

        for (let i = 0; i < PhoneNumberCheck.phoneSetUp.length; i++) {
            if (PhoneNumberCheck.phoneSetUp[i] === "" && arrayOfStr.length > 0) {
                PhoneNumberCheck.phoneSetUp[i] = arrayOfStr[0];
                arrayOfStr.splice(0, 1);
            }
        }

        return PhoneNumberCheck.phoneSetUp.join('').toString();
    }
}
}

export default PhoneNumberCheck;