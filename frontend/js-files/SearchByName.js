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
        console.log(xhr.responseText);
        // if (JSON.parse(xhr.responseText)["status"] == "Logged in") {
        //   localStorage.setItem(
        //     "accessToken",
        //     JSON.parse(xhr.responseText)["token"]
        //   );
        //   window.location.replace(
        //     "https://swj-capstone-staging.herokuapp.com/admin"
        //   );
        // } else {
        //   // Go through login errors...
        // }
      }
    };

    xhr.send();

    // console.log("Success");
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
