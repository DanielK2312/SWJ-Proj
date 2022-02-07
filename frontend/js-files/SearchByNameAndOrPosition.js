/**
 * Javascript file to extract leadership/year. Handles cases where a user wants to serach by ONLY either leadership position, year, or leadership position and year. Handles error case where a name is entered as well
 */

let leadershipPosition = document.getElementById("leadership-dropdown");
let yearDropdown = document.getElementById("year-dropdown");
// local variables to store year nad position values
let leadershipValue = "";
let yearValue = "";

/**
 * extract selected leadership value and assign to local variable
 */
leadershipPosition.addEventListener("change", (e) => {
  e.preventDefault();
  leadershipValue =
    leadershipPosition.options[leadershipPosition.selectedIndex].text;
  // console.log(position);
});

/**
 * extract selected year value and assign to local variable
 */
yearDropdown.addEventListener("change", (e) => {
  e.preventDefault();
  yearValue = yearDropdown.options[yearDropdown.selectedIndex].text;
  // console.log(result);
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // case where name is blank, leadership is filled, and year is blank
  if (
    inputNameValue === "" &&
    leadershipPosition.options[leadershipPosition.selectedIndex].text !==
      "Select Leadership Position..." &&
    yearDropdown.options[yearDropdown.selectedIndex].text === "Select Year..."
  ) {
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
