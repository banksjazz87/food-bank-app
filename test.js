
let test = {name: "henry", sex: "male", address: "USA", phone: "null"};


const allEntries = Object.entries(test);
let ReqData = {};

for (let i = 0; i < allEntries.length; i ++) {
  let currentKey = Object.keys(test)[i];
  let currentValue = Object.values(test)[i];

  if (currentValue === "null") {
    ReqData[currentKey] = null;
  } else {
    ReqData[currentKey] = currentValue;
  }
}

console.log(ReqData);



