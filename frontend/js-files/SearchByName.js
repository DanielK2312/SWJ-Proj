/**
 * Javascript file to get value inputted in name input. Handles situation where a user wants to search ONLY by name and display the results to the page
 */

// variable
let inputName = document.getElementById("search-name");
let submitButton = document.getElementById("search-members");
// local variables to store name value
let inputNameValue = "";
let firstName = "";
let lastName = "";
// store all personInformation objects
let personInfo = [];

// functions
/**
 * Function automatically closes alert message after 5 seconds
 */
let autoClose = () => {
  setTimeout(function () {
    document.querySelector(".w3-panel").style.display = "none";
  }, 10000);
};

/**
 * function resets values to default for person search submission
 */
let clearValue = () => {
  inputName.value = "";
  leadershipPosition.options[leadershipPosition.selectedIndex].text =
    "Select Leadership Position...";
  yearDropdown.options[yearDropdown.selectedIndex].text = "Select Year...";
};

// reset default input values if page is refreshed
window.onload = function () {
  clearValue();
};

/**
 * Functions takes in the chr response and created and object out of every response pushing it to an array in the case where there are multiple people
 * @param {Object} response list of objects if there is more than one match
 * @returns array of locally created objects to fill out possible information
 */
let processXhrResponse = (response) => {
  // loop through every object
  for (let i = 0; i < Object.keys(response).length; i++) {
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

    let currentObject = response[i];

    // loop through current object
    for (const key in currentObject) {
      if (Object.hasOwnProperty.call(currentObject, key)) {
        const searchInfo = currentObject[key];

        const keys = Object.keys(personInformation);

        keys.forEach((element) => {
          if (element == key) {
            // store values recieved from parameter into local object
            personInformation[element] = currentObject[key];
          }
        });
      }
    }
    // push the object into global array to access
    personInfo.push(personInformation);
  }

  // return the array of objects created
  return personInfo;
};

/**
 * function takes in info about people returned from search results and adds a button to the modal window for their information to be displayed
 * @param {list} personInfoArray llist of all objects returned when serached for by name
 */
let processPersonInfoArray = (personInfoArray) => {
  personInfoArray.forEach((element) => {
    $("#person-modal").find(".modal-body").append(`
    <div>
      <p></p>
      <button class="btn btn-secondary btn-block" id="${element.surname}${element._id}">
        ${element.surname}, ${element.firstname} Member Information
      </button>
    </div`);
  });
};

/**
 * create dynamic modals for each individual returned by the search by name api
 * @param {array} personInfoArray global array filled from search by name results
 */
let createDynamicModals = (personInfoArray) => {
  document.getElementById("dynamic-modals").innerHTML = "";

  personInfoArray.forEach((element) => {
    document.getElementById("dynamic-modals").innerHTML += `
    <div class="modal fade bd-example-modal-lg" id="${element._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">${element.surname}, ${element.firstname}</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div id="person-info-body${element._id}" class="modal-body">
          </div>
          <div class="modal-footer">
          <button id="dynamic-close${element._id}" type="button" class="btn btn-secondary">Close</button>
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
let manualDynamicModalTriggers = (array) => {
  array.forEach((element) => {
    document
      .getElementById(`${element.surname}${element._id}`)
      .addEventListener("click", (e) => {
        e.preventDefault();
        $("#person-modal").modal("hide"); // hide main modal
        setTimeout(function () {
          $(`#${element._id}`).modal({ backdrop: "static", keyboard: false });
          $(`#${element._id}`).modal("show"); // show person modal
        }, 500);
      });
    document
      .getElementById(`dynamic-close${element._id}`)
      .addEventListener("click", (e) => {
        e.preventDefault();
        $(`#${element._id}`).modal("hide");
        setTimeout(function () {
          $("#person-modal").modal({ backdrop: "static", keyboard: false });
          $("#person-modal").modal("show");
        }, 500);
      });
  });
};

// event listeners
/**
 * Checks for name value inputted and splits the name into first and last into seperate variables
 */
inputName.addEventListener("input", (e) => {
  e.preventDefault();

  inputNameValue = inputName.value;
  let split = inputNameValue.split(" ");

  // split input into first and last name
  firstName = split[0];
  lastName = split[1];
});

/**
 * handles the search button being pressed querying data from the database
 */
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // case where ONLY name input is filled
  if (
    inputNameValue !== "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text ===
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text === "Select Year..."
  ) {
    document.getElementById("overlay").style.display = "flex";
    // VVVV - Add variable to end of this URL!!!!!!!!!
    var url =
      "https://swj-capstone-staging.herokuapp.com/api/v1/person/byname/" +
      inputNameValue;
    // NOTICE ME!!!

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById("overlay").style.display = "none";

        $("#person-modal").modal({ backdrop: "static", keyboard: false });
        $("#person-modal").modal("show");

        // all data is loaded
        let jsonRes = xhr.responseText;

        // process string received from xhr response into object
        jsonRes = JSON.parse(jsonRes);
        // send object to function to get array of object with info
        processXhrResponse(jsonRes);
        processPersonInfoArray(personInfo);
        createDynamicModals(personInfo);
        manualDynamicModalTriggers(personInfo);
      }
    };
    xhr.send();
  }
  // case where name and leadership position is filled with year staying empty
  else if (
    inputNameValue !== "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text !==
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text === "Select Year..."
  ) {
    document.querySelector(".w3-panel").style.display = "block";
    autoClose();
    clearValue();
  }
  // case where name and year are filled but leadership is empty
  else if (
    inputNameValue !== "" &&
    yearDropdown.options[yearDropdown.selectedIndex].text !==
      "Select Year..." &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text ===
      "Select Leadership Position..."
  ) {
    document.querySelector(".w3-panel").style.display = "block";
    autoClose();
    clearValue();
  }
  // case where name, leadership, and year are filled
  else if (
    inputNameValue !== "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text !==
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text !== "Select Year..."
  ) {
    document.querySelector(".w3-panel").style.display = "block";
    autoClose();
    clearValue();
  }
}); // end submit button event listener

// manually open and close main search modal
// document.getElementById("search-members").addEventListener("click", (e) => {
//   e.preventDefault();
//   $("#person-modal").modal({ backdrop: "static", keyboard: false });
//   $("#person-modal").modal("show");
// });

document.getElementById("close-person-modal").addEventListener("click", (e) => {
  e.preventDefault();
  $("#person-modal").modal("hide");
});

// clear necessary values when the main search modal is closed
document.getElementById("close-person-modal").addEventListener("click", (e) => {
  e.preventDefault();
  let myModal = $("#person-modal");
  myModal.find(".modal-body").text("");
  personInfo = [];
  inputName.value = "";
});
