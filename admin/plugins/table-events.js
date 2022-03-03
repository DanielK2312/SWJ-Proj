// Event Listner to respond when the User clicks on the edit member Button. 
function editMember() {
    // Get the modal
    var modal = document.getElementById("editModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    //When the user clicks the edit member button, the modal will either open or close
    //This is in case the user forgets to close it on a different member
    if (modal.style.display == "block") {
        modal.style.display = "none";
    }

    else {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
}