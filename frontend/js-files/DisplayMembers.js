let holdA = [];
let holdB = [];
let holdC = [];
let holdD = [];
let holdE = [];
let holdF = [];
let holdG = [];
let holdH = [];
let holdI = [];
let holdJ = [];
let holdK = [];
let holdL = [];
let holdM = [];
let holdN = [];
let holdO = [];
let holdP = [];
let holdQ = [];
let holdR = [];
let holdS = [];
let holdT = [];
let holdU = [];
let holdV = [];
let holdW = [];
let holdX = [];
let holdY = [];
let holdZ = [];

// functions
let allocateNames = (jsonRes) => {
  jsonRes.forEach((element) => {
    switch (element.surname[0]) {
      case "A":
        if (element.firstname === "") {
          console.log("here");
          holdA.push(element.surname);
        } else {
          let name = element.surname + ", " + element.firstname;
          holdA.push(name);
        }
      case "B":
        if (element.firstname === "") {
          holdB.push(element.surname);
        } else {
          let name = element.surname + ", " + element.firstname;
          holdB.push(name);
        }
      case "C":
        if (element.firstname === "") {
          holdC.push(element.surname);
        } else {
          let name = element.surname + ", " + element.firstname;
          holdC.push(name);
        }
      case "D":
        if (element.firstname === "") {
          holdD.push(element.surname);
        } else {
          let name = element.surname + ", " + element.firstname;
          holdD.push(name);
        }
      case "E":
        if (element.firstname === "") {
          holdE.push(element.surname);
        } else {
          let name = element.surname + ", " + element.firstname;
          holdE.push(name);
        }
      default:
        break;
    }
  });
};

window.addEventListener("load", () => {
  url = "https://swj-capstone.herokuapp.com/api/v1/person/list";

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // all data is loaded
      let jsonRes = xhr.responseText;

      // process string received from xhr response into object
      jsonRes = JSON.parse(jsonRes);

      allocateNames(jsonRes);
    }
  };
  xhr.send();
});
