const PhoneNumberCheck = {
    
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
            let phoneFormat = ['(', '', '', '', ')', '-', '', '', '', '-', '', '', '', ''];
            let arrayOfStr = PhoneNumberCheck.returnNumbers(str).split('');

            for (let i = 0; i < phoneFormat.length; i++) {
                if (phoneFormat[i] === "" && arrayOfStr.length > 0) {
                    phoneFormat[i] = arrayOfStr[0];
                    arrayOfStr.splice(0, 1);
                }
            }
            return phoneFormat.join('').toString();
        }
    }

}

export default PhoneNumberCheck;