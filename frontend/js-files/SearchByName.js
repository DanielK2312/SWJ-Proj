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
  document.getElementById("person-info-body").innerHTML = "";

  // create seperate button for each individual
  personInfoArray.forEach((element) => {
    document.getElementById("person-info-body").innerHTML += `
        <div>
          <p></p>
          <button class="btn btn-secondary btn-block" id=${element.surname} data-toggle="modal" data-target="#${element.surname}, #person-modal"> // problem area
            ${element.surname}, ${element.firstname} Member Information
          </button>
        </div
    `;
  });

  personInfoArray.forEach((element) => {
    document.body.innerHTML += `
    <div class="modal fade bd-example-modal-md" id=${element.surname} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="exampleModalLabel">Search Results</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div id="person-info-body" class="modal-body">
        test
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    `;
  });

  // clear global array so duplicates aren't made
  personInfo = [];
  inputName.value = "";
};

/**
 * function processes data received about a certain person and puts it into a readable form to include in a bootstrap modal window
 * @param {String} jsonString string containing all info about a searched person
 */
let processStringify = (jsonString) => {
  let keyArr = [];
  let valArr = [];

  // split string into array of strings
  let splitArr = jsonString.split(",");
  console.log(splitArr); // each key AND value pair

  // for each string elements, create a p tag and append to the modal body
  splitArr.forEach((element) => {
    let keyValue = element.split(":");

    /**
     * This is where a lot of processing occurs. after splitting by the comma, need to split again by the colon since each element of the key value pair has a few elements that cannot be included in the modal
     */
    let counter = 1;
    keyValue.forEach((element) => {
      // console.log(element); // each individual key and value pair
      let ele = "";
      for (let i = 1; i < element.length - 1; i++) {
        // // xtra char
        if (element[i] === '"') {
          continue;
          //   // xtra char
        } else if (element[i] === "]") {
          continue;
        } else {
          ele += element[i];
        }
      }
      // console.log(ele);

      if (counter % 2 == 0) {
        valArr.push(ele);
        counter++;
      } else {
        keyArr.push(ele);
        counter++;
      }
    });
    console.log(keyArr);
    console.log(valArr);
    // console.log(keyValue);

    // $("#person-modal").find(".modal-body").append(element);
  });

  // change title of modal to surname, firstname (if present)
  if (valArr[1] !== "") {
    document.getElementById(
      "exampleModalLabel"
    ).innerHTML = `${valArr[0]}, ${valArr[1]}`;
  } else {
    document.getElementById("exampleModalLabel").innerHTML = `${valArr[0]}`;
  }

  // add information present for individuals to modal
  for (let i = 0; i < keyArr.length; i++) {
    let p = document.createElement("p");
    p.innerHTML = `${keyArr[i]}: ${valArr[i]}`;
    // if information is missing, don't display on modal
    if (valArr[i] === "") {
      continue;
    } else {
      document.getElementById("person-info-body").appendChild(p);
    }
  }
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
    // VVVV - Add variable to end of this URL!!!!!!!!!
    var url =
      "https://swj-capstone-staging.herokuapp.com/api/v1/person/search/" +
      inputNameValue;
    // NOTICE ME!!!

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // all data is loaded
        let jsonRes = xhr.responseText;

        // process string received from xhr response into object
        jsonRes = JSON.parse(jsonRes);
        // send object to function to get array of object with info
        processXhrResponse(jsonRes);
        processPersonInfoArray(personInfo);

        // add data about person to information queried from database
        // $("#person-modal")
        //   .find(".modal-body")
        //   .append(JSON.stringify(personInformation));
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
    // console.log("Error1");
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
    // console.log("Error2");
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
    // console.log("Error3");
    document.querySelector(".w3-panel").style.display = "block";
    autoClose();
    clearValue();
  }
});
