const PhoneNumberCheck = {

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
            PhoneNumberCheck.phoneSetUp = ['(', '', '', '', ')', '-', '', '', '', '-', '', '', '', ''];
            let arrayOfStr = PhoneNumberCheck.returnNumbers(str).split('');

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