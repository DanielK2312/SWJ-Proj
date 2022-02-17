/**
 * Javascript file to get value inputted in name input. Handles situation where a user wants to search ONLY by name and display the results to the page
 */

// variable
let inputName = document.getElementById("search-name");
let submitButton = document.getElementById("search-members");
let modalWindow = document.getElementById("trigger-modal");
// local variables to store name value
let inputNameValue = "";
let firstName = "";
let lastName = "";
// person object used to fill out modal
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
        // console.log(xhr.responseText);
        let jsonRes = xhr.responseText;
        // make modal window able to appear
        modalWindow.style.display = "block";

        // process string received from xhr response
        jsonRes = JSON.parse(jsonRes);
        let firstIdx = jsonRes[0]; // #TODO fix
        for (const key in firstIdx) {
          if (Object.hasOwnProperty.call(firstIdx, key)) {
            const searchInfo = firstIdx[key];

            const keys = Object.keys(personInformation);

            keys.forEach((element) => {
              if (element == key) {
                // store matching key values in gloabl person information object
                personInformation[element] = firstIdx[key];
              }
            });
          }
        }
        // end string processing from xhr response

        // process string to put in readable format in modal
        processStringify(JSON.stringify(personInformation));

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
