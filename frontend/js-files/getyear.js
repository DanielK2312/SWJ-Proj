/**
 * js file to get value selected in dropdown
 */

let yearDropdown = document.getElementById("year-dropdown");

yearDropdown.addEventListener("change", (e) => {
  let result = yearDropdown.options[yearDropdown.selectedIndex].text;
  // console.log(result);
});