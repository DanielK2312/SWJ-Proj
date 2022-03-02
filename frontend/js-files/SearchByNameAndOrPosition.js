/**
 * Javascript file to extract leadership/year. Handles cases where a user wants to serach by ONLY either leadership position, year, or leadership position and year. Handles error case where a name is entered as well
 */

// variables
let leadershipPosition = document.getElementById("leadership-dropdown");
let yearDropdown = document.getElementById("year-dropdown");
// local variables to store year nad position values
let leadershipValue = "";
let yearValue = "";

// functions

// event listeners
/**
 * extract selected leadership value and assign to local variable
 */
leadershipPosition.addEventListener("change", (e) => {
  e.preventDefault();
  leadershipValue =
    leadershipPosition.options[leadershipPosition.selectedIndex].text;
});

/**
 * extract selected year value and assign to local variable
 */
yearDropdown.addEventListener("change", (e) => {
  e.preventDefault();
  yearValue = yearDropdown.options[yearDropdown.selectedIndex].text;
});

// main event listener
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // case where name is blank, leadership is filled, and year is blank
  if (
    inputNameValue === "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text !==
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text === "Select Year..."
  ) {
    document.getElementById("overlay").style.display = "flex";

    url =
      "https://swj-capstone.herokuapp.com/api/v1/person/byposition/" +
      leadershipValue;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // get rid of spinner
        document.getElementById("overlay").style.display = "none";

        // display main modal window
        $("#person-modal").modal({ backdrop: "static", keyboard: false });
        $("#person-modal").modal("show");

        // all data is loaded
        let jsonRes = xhr.responseText;

        // process string received from xhr response into object
        jsonRes = JSON.parse(jsonRes);

        // call functions from SearchByName.js

        // takes in xhr response, returns array of objects to process
        processXhrResponse(jsonRes);
        // loops through array of objects and creates a button for each of them on the main modal window
        processPersonInfoArray(personInfo);
        // creates dynamic modal window for each individual with a button created above
        createDynamicModals(personInfo);
        // handles manual triggers for each modal window
        manualDynamicModalTriggers(personInfo);
      }
    };
    xhr.send();
    // console.log("success2");
  }
  // case where name is blank, leadership is blank, and year is filled
  else if (
    inputNameValue === "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text ===
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text !== "Select Year..."
  ) {
    // console.log("success3");
  }
  // case where name is blank, leadership and year are filled
  else if (
    inputNameValue === "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text !==
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text !== "Select Year..."
  ) {
    // console.log("success4");
  }
});
