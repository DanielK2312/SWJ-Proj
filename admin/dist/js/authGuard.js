// On page load, check for auth
document.addEventListener("DOMContentLoaded", function () {
    checkAuth()
});


function checkAuth() {
    let domain = "";
    if (window.location.hostname == 'localhost') {
        domain = "http://localhost:3000";
    } else {
        domain = window.location.hostname;
    }

    var url = domain+"/api/v1/auth/check";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 401) {
            // Access token is invalid, need to refresh
            console.log('[AUTH] - Invalid session.')
            window.location.href = '/admin/pages/login.html';
        } else if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('[AUTH] - Session is valid.')
            // Token is valid
            return true;
        }
    }
    xhr.send()
}