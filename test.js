function findIndex(array, param) {
    let blank = false;

    for (let i = 0; i < array.length; i++) {
        let values = Object.values(array[i]);

        if (values.indexOf(param) > -1) {
            blank = true;
        } 
    }

    if (blank) {
        return "Item found";
    } else {
        return "Items not found";
    }
}

const testArray = [
    {name: "Mary", sex: "Female"}, 
    {name: "Joe", sex: "Male"}, 
    {name: "Albert", sex: "Male"}
];

console.log(findIndex(testArray, "Mary"));
console.log(findIndex(testArray, "Joe"));
console.log(findIndex(testArray, "Henry"));

