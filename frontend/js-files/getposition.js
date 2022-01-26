/**
 * Javascript file to extract leadership position
 */

let leadershipPosition = document.getElementById("leadership-position");

// extract value
leadershipPosition.addEventListener("input", (e) => {
  e.preventDefault();
  let position = leadershipPosition.value;

  console.log(position);
});
