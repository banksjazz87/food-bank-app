const PhoneNumberCheck = {

    addBracketsAndDash: (str) => {
        if (str.length === 3) {
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
        } else if (str.length === 10 && str[0] !== '(' && str[4] !== ')' && str[5] !== "-" && str[9] !== '-') {
            let array = str.split('');
            let firstThree = array.slice(0, 3).join('').toString();
            let secondThree = array.slice(3, 6).join('').toString();
            let finalFour = array.slice(6).join('').toString();
            let formattedPhone = `(${firstThree})-${secondThree}-${finalFour}`;
            return formattedPhone;

        }
    },


    checkLength: (str) => {
        if (str) {
            if (PhoneNumberCheck.checkForNumber(str[str.length - 1])) {
                if (str && str.length === 3) {
                    return PhoneNumberCheck.addBracketsAndDash(str);
                } else if (str && str.length === 9) {
                    return PhoneNumberCheck.addSecondDash(str);
                } else if (str && str.length >= 10) {
                    return PhoneNumberCheck.checkPhoneFormat(str);
                } else if (str) {
                    return str;
                } else {
                    return;
                }
            } else {
                alert('Please provide a valid phone number');
                return '';
            }
        }
    },

}

export default PhoneNumberCheck;