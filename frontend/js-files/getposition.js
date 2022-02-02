/**
 * Javascript file to extract leadership position
 */

let leadershipPosition = document.getElementById("leadership-dropdown");

// extract value
leadershipPosition.addEventListener("change", (e) => {
  e.preventDefault();
  let position =
    leadershipPosition.options[leadershipPosition.selectedIndex].text;

  // console.log(position);
});
