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
let personInfo = [];

// functions
let allocateNames = (jsonRes) => {
  jsonRes.forEach((element) => {
    let surname = element.surname[0];
    let firstName = element.firstname;
    if (surname === "A") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdA.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdA.push(obj);
      }
    } else if (surname === "B") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdB.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdB.push(obj);
      }
    } else if (surname === "C") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdC.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdC.push(obj);
      }
    } else if (surname === "D") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdD.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdD.push(obj);
      }
    } else if (surname === "E") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdE.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdE.push(obj);
      }
    } else if (surname === "F") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdF.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdF.push(obj);
      }
    } else if (surname === "G") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdG.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdG.push(obj);
      }
    } else if (surname === "H") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdH.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdH.push(obj);
      }
    } else if (surname === "I") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdI.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdI.push(obj);
      }
    } else if (surname === "J") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdJ.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdJ.push(obj);
      }
    } else if (surname === "K") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdK.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdK.push(obj);
      }
    } else if (surname === "L") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdL.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdL.push(obj);
      }
    } else if (surname === "M") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdM.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdM.push(obj);
      }
    } else if (surname === "N") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdN.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdN.push(obj);
      }
    } else if (surname === "O") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdO.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdO.push(obj);
      }
    } else if (surname === "P") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdP.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdP.push(obj);
      }
    } else if (surname === "Q") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdQ.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdQ.push(obj);
      }
    } else if (surname === "R") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdR.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdR.push(obj);
      }
    } else if (surname === "S") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdS.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdS.push(obj);
      }
    } else if (surname === "T") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdT.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdT.push(obj);
      }
    } else if (surname === "U") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdU.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdU.push(obj);
      }
    } else if (surname === "V") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdV.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdV.push(obj);
      }
    } else if (surname === "W") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdW.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdW.push(obj);
      }
    } else if (surname === "X") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdX.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdX.push(obj);
      }
    } else if (surname === "Y") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdY.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdY.push(obj);
      }
    } else if (surname === "Z") {
      if (firstName === "") {
        let obj = {
          surname: element.surname,
          firstName: "",
          id: element._id,
        };
        holdZ.push(obj);
      } else {
        let obj = {
          firstName: element.firstname,
          surname: element.surname,
          id: element._id,
        };
        holdZ.push(obj);
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
    // document.getElementById(
    //   firstLetter
    // ).innerHTML += `<a href="url">${element}</a><br>`;
    // document.getElementById(
    //   firstLetter
    // ).innerHTML += `<button onclick="renderModal('${element}')" id="${element}">${element}</button><br>`;
    let button = document.createElement("button");
    button.setAttribute("id", `${element.id}`);
    button.setAttribute("class", "btn-style");
    let br = document.createElement("br");
    button.innerHTML = element.surname + ", " + element.firstName;
    button.onclick = () => {
      createModal(element.surname, element.id);

      $("#person-modal").modal("hide");
      setTimeout(function () {
        $(`#${element.id}`).modal({ backdrop: "static", keyboard: false });
        $(`#${element.id}`).modal("show");
      }, 100);
    };

    document.getElementById(firstLetter).appendChild(button);
    document.getElementById(firstLetter).appendChild(br);
  });
};

// #TODO currently here trying to solve issue
let createModal = (surname, id) => {
  url = "https://swj1894.org/api/v1/person/byname/" + surname;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let jsonRes = xhr.responseText;
      let current = {};
      jsonRes = JSON.parse(jsonRes);

      // find id of person we are currently searching for
      jsonRes.forEach((element) => {
        if (element._id == id) {
          current = element;
        }
      });

      processXhrResponse(current);
      createDynamicModals(personInfo);
    }
  };
  xhr.send();
};

/**
 * Functions takes in the xhr response and creates an object out of every response pushing it to an array in the case where there are multiple people
 * @param {Object} response list of objects if there is more than one match
 * @returns array of locally created objects to fill out possible information
 */
let processXhrResponse = (response) => {
  // clear local array to avoid pushing multiple people
  personInfo = [];

  // create new object for every object in list of objects
  let personInformation = {
    surname: "",
    firstname: "",
    prefix: "",
    pen_name: "",
    dob: "",
    dod: "",
    position: "",
    address: "",
    neighborhood: "",
    city: "",
    post_code: "",
    proposer: "",
    orgs: "",
    periodicals: "",
    sources: "",
    date_range: "",
    _id: "",
  };

  // loop through current object
  for (const key in response) {
    if (Object.hasOwnProperty.call(response, key)) {
      const searchInfo = response[key];

      const keys = Object.keys(personInformation);

      keys.forEach((element) => {
        if (element == key) {
          // store values recieved from parameter into local object
          personInformation[element] = response[key];
        }
      });
    }
  }
  // push the object into global array to access
  personInfo.push(personInformation);

  // return the array of objects created
  return personInfo;
};

/**
 * create dynamic modals for each individual returned by the search by name api
 * @param {array} personInfoArray global array filled from search by name results
 */
let createDynamicModals = (personInfoArray) => {
  document.getElementById("member-modals").innerHTML = "";

  personInfoArray.forEach((element) => {
    document.getElementById("member-modals").innerHTML += `
    <div class="modal fade bd-example-modal-lg" id="${element._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">${element.surname}, ${element.firstname}</h2>
          </div>
          <div id="person-info-body${element._id}" class="modal-body">
          </div>
          <div class="modal-footer">
          <button id="dynamic-close${element._id}" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;
  });

  personInfoArray.forEach((element) => {
    let myModal = $(`#${element._id}`);
    myModal
      .find(`#person-info-body${element._id}`)
      .append(
        `<p>Surname: ${element.surname}</p>`,
        element.firstname === ""
          ? ""
          : `<p>First Name: ${element.firstname} </p>`,
        element.prefix === "" ? "" : `<p>Prefix: ${element.prefix}</p>`,
        element.pen_name === "" ? "" : `<p>Pen Name: ${element.pen_name}</p>`,
        element.dob === "" ? "" : `<p>Date of Birth: ${element.dob}</p>`,
        element.dod === "" ? "" : `<p>Date of Death: ${element.dod}</p>`,
        element.position === "" ? "" : `<p>Position: ${element.position}</p>`,
        element.address === "" ? "" : `<p>Address: ${element.address}</p>`,
        element.neighborhood === ""
          ? ""
          : `<p>Neighborhood: ${element.neighborhood}</p>`,
        element.city === "" ? "" : `<p>City: ${element.city}</p>`,
        element.post_code === ""
          ? ""
          : `<p>Postal Code: ${element.post_code}</p>`,
        element.proposer === "" ? "" : `<p>Proposer: ${element.proposer}</p>`,
        element.orgs.length === 0
          ? ""
          : `<p>Organization(s): ${element.orgs}</p>`,
        element.periodicals === ""
          ? ""
          : `<p>Periodicals: ${element.periodicals}</p>`,
        element.sources === "" ? "" : `<p>Sources: ${element.sources}</p>`,
        element.date_range.length === 0
          ? ""
          : `<p>Date Range(s): ${element.date_range}</p>`
      );
  });
};

/**
 * handle manual modal triggers for viewing information about each individual
 * @param {Array} array global array containing people returned from search by name api
 */
let manualDynamicModalTriggers = (id) => {
  document
    .getElementById(`dynamic-close${id}`)
    .addEventListener("click", (e) => {
      e.preventDefault();
      $(`#${id}`).modal("hide");
    });
};

window.addEventListener("load", () => {
  document.getElementById("spinner").classList.add("show");
  url = "https://swj1894.org/api/v1/person/list";

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
      document.getElementById("spinner").classList.remove("show");
    }
  };
  xhr.send();
});
