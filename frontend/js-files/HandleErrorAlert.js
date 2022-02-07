/**
 * close error alert when the x button is pressed
 */
let closeErrorAlert = document.getElementById("error-alert");
closeErrorAlert.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".w3-panel").style.display = "none";
});
