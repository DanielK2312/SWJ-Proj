/**
 * Javascript file to extract leadership/year. Handles cases where a user wants to serach by ONLY either leadership position, year, or leadership position and year. Handles error case where a name is entered as well
 */

// variables
let leadershipPosition = document.getElementById("leadership-dropdown");
let yearDropdown = document.getElementById("year-dropdown");
// local variables to store year and position values
let leadershipValue = "";
let yearValue = "";

// variables for searching by leadership position and year
// inital combined array
let combinedLeadershipYear = [];
// indexes valid for date range
let validDates = [];
// inital filtered array after finding elements with valid date range
let processedDate = [];
// filtered array containing elements with matching leadership value
let validLeadershipIndexes = [];
// final array ready to be run through functions
let processedArr = [];

// functions
let clearLocal = () => {
  combinedLeadershipYear = [];
  validDates = [];
  processedDate = [];
  validLeadershipIndexes = [];
  processedArr = [];
  leadershipValue = "";
  yearValue = "";
};

/**
 * retrieve year value selected
 */
let setYear = () => {
  yearValue = yearDropdown.options[yearDropdown.selectedIndex].text;
};

/**
 * retrieve position value selected
 */
let setPosition = () => {
  leadershipValue =
    leadershipPosition.options[leadershipPosition.selectedIndex].text;
};

/**
 * retrieve year and position values selected
 */
let setYearAndPosition = () => {
  leadershipValue =
    leadershipPosition.options[leadershipPosition.selectedIndex].text;
  yearValue = yearDropdown.options[yearDropdown.selectedIndex].text;
};

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
    // get value of leadership position
    setPosition();

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
  }
  // case where name is blank, leadership is blank, and year is filled
  else if (
    inputNameValue === "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text ===
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text !== "Select Year..."
  ) {
    // get value of year
    setYear();

    document.getElementById("overlay").style.display = "flex";

    url =
      "https://swj-capstone.herokuapp.com/api/v1/person/bydate/" + yearValue;

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
  }
  // case where name is blank, leadership and year are filled
  else if (
    inputNameValue === "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text !==
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text !== "Select Year..."
  ) {
    // get value of leadership position and year
    setYearAndPosition();

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
        // all data is loaded
        let jsonRes = xhr.responseText;

        // process string received from xhr response into object
        jsonRes = JSON.parse(jsonRes);
        jsonRes.forEach((element) => {
          combinedLeadershipYear.push(element);
        });
      }
    };
    xhr.send();

    console.log(yearValue);

    url2 =
      "https://swj-capstone.herokuapp.com/api/v1/person/bydate/" + yearValue;

    let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", url2);

    xhr2.setRequestHeader("Accept", "application/json");
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4 && xhr2.status === 200) {
        // get rid of spinner
        document.getElementById("overlay").style.display = "none";

        // display main modal window
        $("#person-modal").modal({ backdrop: "static", keyboard: false });
        $("#person-modal").modal("show");

        // all data is loaded
        let jsonRes2 = xhr2.responseText;

        // process string received from xhr response into object
        jsonRes2 = JSON.parse(jsonRes2);
        jsonRes2.forEach((element) => {
          combinedLeadershipYear.push(element);
        });

        // find elements with matching year range and push them to an array to keep track of the indexes
        combinedLeadershipYear.forEach((element, index) => {
          element.date_range.forEach((element) => {
            if (element == yearValue) {
              validDates.push(index);
            }
          });
        });

        // loop through indexes that have valid date and push them to a processed array
        validDates.forEach((element) => {
          processedDate.push(combinedLeadershipYear[element]);
        });

        // find matches for position being searched for and save in a seperate array
        processedDate.forEach((element, index) => {
          if (element.position.includes(leadershipValue)) {
            validLeadershipIndexes.push(index);
          }
        });

        // loop through indexes that have the valid leadership position and push them to the final processed array
        validLeadershipIndexes.forEach((element) => {
          processedArr.push(processedDate[element]);
        });

        // get rid of any duplicate ids from list
        const seen = new Set();
        const filteredArr = processedArr.filter((el) => {
          const duplicate = seen.has(el.id);
          seen.add(el.id);
          return !duplicate;
        });

        // takes in xhr response, returns array of objects to process
        processXhrResponse(filteredArr);
        // loops through array of objects and creates a button for each of them on the main modal window
        processPersonInfoArray(personInfo);
        // creates dynamic modal window for each individual with a button created above
        createDynamicModals(personInfo);
        // handles manual triggers for each modal window
        manualDynamicModalTriggers(personInfo);

        console.log(combinedLeadershipYear);
        console.log(validDates);
        console.log(processedDate);
        console.log(validLeadershipIndexes);
        console.log(processedArr);
      }
    };
    xhr2.send();
  }
});

// clear local values when modal window closes
document.getElementById("close-person-modal").addEventListener("click", (e) => {
  e.preventDefault();
  clearLocal();
  clearDropdowns();
});
