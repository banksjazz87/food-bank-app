const MathFunctions = {
  //Takes a string and returns all of the first numbers in the string.
  returnFirstNumbers: (string) => {
    let i = 0;
    let stringOfNum = "";
    while (!isNaN(parseInt(string[i]))) {
      stringOfNum = stringOfNum + string[i];
      i++;
    }
    return parseInt(stringOfNum);
  },

  //Takes a string and returns a string of the values that can be numbers.
  returnNums: (string) => {
    let num = "";

    for (let i = 0; i < string.length; i++) {
      let numCheck = parseInt(string[i]);
      if (!isNaN(numCheck)) {
        num = num + string[i];
      }
    }

    return num;
  },
};

export default MathFunctions;
