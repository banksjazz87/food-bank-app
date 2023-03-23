
const ZipCodeFunctions = {

    //Get vaild zipcode and city pairs.
    getZipCodePairs: (arr) => {
        let zipCodeObj = {};

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].zip) {
                let cityLowerCase = arr[i].city.toLowerCase();
                zipCodeObj[cityLowerCase] = arr[i].zip;
            }
        }
        return zipCodeObj;
    },

    //Get the zip code for a specific city.
    getZipCode: (obj, city) => {
        let cityLowerCase = city.toLowerCase();

        if (obj[cityLowerCase]) {
            return obj[cityLowerCase];
        }
    },
}

export default ZipCodeFunctions;
