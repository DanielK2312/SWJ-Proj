/**
 * Javascript file to get value inputted in name input
 */

let inputName = document.getElementById("search-name");
let mainPageLeadershipPosition = document.getElementById("leadership-position");
let mainPageYear = document.getElementById("year-dropdown");

/**
 * checks for every letter that is inputted
 */
inputName.addEventListener("input", (e) => {
  e.preventDefault();

  let name = inputName.value;
  let split = name.split(" ");

  // split input into first and last name
  let firstName = split[0];
  let lastName = split[1];

  /**
   * deal with submit button and ensure there is no input in either of the other options
   */
  let submitButton = document.getElementById("search-members");

  /**
   * event listener works only if there is a value for name due to event listener nested
   */
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    // case makes sure leadership position and year are empty
    if (
      mainPageLeadershipPosition.value === "" &&
      mainPageYear.options[mainPageYear.selectedIndex].text == "Select Year..."
    ) {
      console.log("Cool");
      // make API request
    }
    // case handles situation where name leadership position is filled and year is either empty or has a selected year
    else if (
      mainPageLeadershipPosition.value !== "" &&
      (mainPageYear.options[mainPageYear.selectedIndex].text ===
        "Select Year..." ||
        mainPageYear.options[mainPageYear.selectedIndex].text !==
          "Select Year...")
    ) {
      // TODO: need to add some sort of message
      console.log("no");
    }
    // case handles if leadership position is either empty or has a value and the year dropdown has a filled value
    else if (
      (mainPageLeadershipPosition.value !== "" ||
        mainPageLeadershipPosition.value === "") &&
      mainPageYear.options[mainPageYear.selectedIndex].text !== "Select Year..."
    ) {
      console.log("Also bad");
      // TODO: need to add some sort of message
    } else {
      alert("Something Went Wrong...");
    }
  });
});
