// Local Variables
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
    let surname = element.surname[0];
    let firstName = element.firstname;
    if (surname === "A") {
      if (firstName === "") {
        holdA.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdA.push(name);
      }
    } else if (surname === "B") {
      if (firstName === "") {
        holdB.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdB.push(name);
      }
    } else if (surname === "C") {
      if (firstName === "") {
        holdC.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdC.push(name);
      }
    } else if (surname === "D") {
      if (firstName === "") {
        holdD.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdD.push(name);
      }
    } else if (surname === "E") {
      if (firstName === "") {
        holdE.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdE.push(name);
      }
    } else if (surname === "F") {
      if (firstName === "") {
        holdF.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdF.push(name);
      }
    } else if (surname === "G") {
      if (firstName === "") {
        holdG.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdG.push(name);
      }
    } else if (surname === "H") {
      if (firstName === "") {
        holdH.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdH.push(name);
      }
    } else if (surname === "I") {
      if (firstName === "") {
        holdI.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdI.push(name);
      }
    } else if (surname === "J") {
      if (firstName === "") {
        holdJ.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdJ.push(name);
      }
    } else if (surname === "K") {
      if (firstName === "") {
        holdK.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdK.push(name);
      }
    } else if (surname === "L") {
      if (firstName === "") {
        holdL.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdL.push(name);
      }
    } else if (surname === "M") {
      if (firstName === "") {
        holdM.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdM.push(name);
      }
    } else if (surname === "N") {
      if (firstName === "") {
        holdN.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdN.push(name);
      }
    } else if (surname === "O") {
      if (firstName === "") {
        holdO.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdO.push(name);
      }
    } else if (surname === "P") {
      if (firstName === "") {
        holdP.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdP.push(name);
      }
    } else if (surname === "Q") {
      if (firstName === "") {
        holdQ.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdQ.push(name);
      }
    } else if (surname === "R") {
      if (firstName === "") {
        holdR.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdR.push(name);
      }
    } else if (surname === "S") {
      if (firstName === "") {
        holdS.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdS.push(name);
      }
    } else if (surname === "T") {
      if (firstName === "") {
        holdT.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdT.push(name);
      }
    } else if (surname === "U") {
      if (firstName === "") {
        holdU.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdU.push(name);
      }
    } else if (surname === "V") {
      if (firstName === "") {
        holdV.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdV.push(name);
      }
    } else if (surname === "W") {
      if (firstName === "") {
        holdW.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdW.push(name);
      }
    } else if (surname === "X") {
      if (firstName === "") {
        holdX.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdX.push(name);
      }
    } else if (surname === "Y") {
      if (firstName === "") {
        holdY.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdY.push(name);
      }
    } else if (surname === "Z") {
      if (firstName === "") {
        holdZ.push(element.surname);
      } else {
        let name = element.surname + ", " + element.firstname;
        holdZ.push(name);
      }
    }
  });
};

/**
 * function takes in list of a certain last name and first letter of last name and dynamically lists out all of the members
 * @param {List} list
 * @param {String} firstLetter
 */
let createDynamicLinks = (list, firstLetter) => {
  list.forEach((element) => {
    document.getElementById(
      firstLetter
    ).innerHTML += `<a href="url">${element}</a><br>`;
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
      createDynamicLinks(holdA, "a");
      createDynamicLinks(holdB, "b");
      createDynamicLinks(holdC, "c");
      createDynamicLinks(holdD, "d");
      createDynamicLinks(holdE, "e");
      createDynamicLinks(holdF, "f");
      createDynamicLinks(holdG, "g");
      createDynamicLinks(holdH, "h");
      createDynamicLinks(holdI, "i");
      createDynamicLinks(holdJ, "j");
      createDynamicLinks(holdK, "k");
      createDynamicLinks(holdL, "l");
      createDynamicLinks(holdM, "m");
      createDynamicLinks(holdN, "n");
      createDynamicLinks(holdO, "o");
      createDynamicLinks(holdP, "p");
      createDynamicLinks(holdQ, "q");
      createDynamicLinks(holdR, "r");
      createDynamicLinks(holdS, "s");
      createDynamicLinks(holdT, "t");
      createDynamicLinks(holdU, "u");
      createDynamicLinks(holdV, "v");
      createDynamicLinks(holdW, "w");
      createDynamicLinks(holdX, "x");
      createDynamicLinks(holdY, "y");
      createDynamicLinks(holdZ, "z");
    }
  };
  xhr.send();
});
