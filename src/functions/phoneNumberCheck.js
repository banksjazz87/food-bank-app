const PhoneNumberCheck = {

    /**
     * 
     * @param {string} str 
     * @returns {string} return a string of a formatted phone number.
     */
    setPhoneNumber: (str) => {
        if (str) {
            let newStr;
            switch (str.length) {
                case 3:
                    newStr = `(${str})-`;
                    break;
                case 9:
                    newStr = str + "-";
                    break;
                case 15:
                    newStr = str.slice(0, -1);
                    break;
                default:
                    newStr = str;
                    break;
            }
            return newStr;

        }
    },

    /**
     *
     * @param {array} field the field that is being updated.
     * @param {string} value the value that is being entered into the
     * @param {object} obj the current object that is being updated
     * @param {date object} date the current date object
     * @returns {void} updates the state of the selectedApplicant phone number field, or throws an alert to provide a valid number.
     */
    checkNumberAndUpdate: (field, value, obj, date, updateMethod) => {
        if (!isNaN(parseInt(value[value.length - 1]))) {
            let phoneNum = PhoneNumberCheck.setPhoneNumber(value);
            obj[0][field] = phoneNum;
            obj[0]["dateAltered"] = date.toLocaleDateString();
            updateMethod(obj);
        } else {
            alert("Please provide a valid Number");
        }
    },


    /**
     *
     * @param {array} field the field that is being updated.
     * @param {string} value the value that is being entered into the
     * @param {object} obj the current object that is being updated
     * @param {date object} date the current date object
     * @returns {void} updates the state of the selectedApplicant
     */
    phoneNumberUpdate: (field, value, obj, date, updateMethod) => {
        const phone = obj[0].phone;
        const prevPhoneLength = phone ? phone.length : -1;

        if (value.length > prevPhoneLength) {
            PhoneNumberCheck.checkNumberAndUpdate(field, value, obj, date, updateMethod);
        } else {
            obj[0][field] = value;
            obj[0]["dateAltered"] = date.toLocaleDateString();
            updateMethod(obj);
        }
    },


    /**
     * 
     * @param {string} value the current typed in value
     * @returns {string or void} a formatted phone number or throws an alert.
     */
    checkForValidNumber: (value) => {
        if (!isNaN(parseInt(value[value.length - 1]))) {
            let phoneNum = PhoneNumberCheck.setPhoneNumber(value);
            return phoneNum;
        } else {
            alert("Please provide a valid Number");
            const removeNan = value.length > 1 ? value.slice(0, -1) : '';
            return removeNan;
        }
    },


    /**
     * 
     * @param {string} value the current typed in value
     * @param {Object} obj this is the object that's being updated for the new user.
     * @returns {string or void} this will either return a string of the newly formatted phone number or throw an alert to provide a valid number.
     */
    returnUpdatedPhoneNumber: (value, obj) => {
        const phoneNum = obj['phone'];
        let prevPhoneLength = phoneNum ? phoneNum.length : -1;

        if (value.length > prevPhoneLength) {
            let updatedPhoneNum = PhoneNumberCheck.checkForValidNumber(value);
            return updatedPhoneNum;
        } else {
            return value;
        }
    }

}

export default PhoneNumberCheck;