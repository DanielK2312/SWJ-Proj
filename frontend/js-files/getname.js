/**
 * Javascript file to get value inputted in name input
 */

let inputName = document.getElementById("search-name");

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
});
