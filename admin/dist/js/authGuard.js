function doesHttpOnlyCookieExist(cookieName) {
    var d = new Date();
    d.setTime(d.getTime() + (1000));
    var expires = "expires=" + d.toUTCString();

    document.cookie = cookieName + "=new_value;path=/;" + expires;
    return document.cookie.indexOf(cookieName + '=') == -1;
}

// On page load, check for auth
document.addEventListener("DOMContentLoaded", function () {
    // Check for access token
    const access_token = localStorage.getItem('accessToken');

    if (access_token == null) {
        const refresh_exists = doesHttpOnlyCookieExist('refreshToken');

        if (refresh_exists) {
            // Attempt to refresh access
            refreshToken()
        } else {
            // Send to login window
            // window.location.replace("https://swj-capstone.herokuapp.com/admin/pages/login.html");
            window.location.replace("https://swj-capstone-staging.herokuapp.com/admin/pages/login.html");
        }
    } else {
        // check if access token is valid
        checkAccessToken()
    }
});


function checkAccessToken() {
    var url = "https://swj-capstone-staging.herokuapp.com/api/auth/check";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("x-access-token", localStorage.getItem('accessToken'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 401) {
            // Access token is invalid, need to refresh
            refreshToken();
        } else if (xhr.readyState === 4 && xhr.status === 200) {
            // Token is valid
            return true;
        }
    }
    xhr.send()
}

function refreshToken() {
    var url = "https://swj-capstone-staging.herokuapp.com/api/auth/token";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 404) {
            // No auth, send to login page
            window.location.replace("https://swj-capstone-staging.herokuapp.com/admin/pages/login.html");
        } else if (xhr.readyState === 4 && xhr.status === 200) {
            // Token is valid
            localStorage.setItem('accessToken', JSON.parse(xhr.responseText)['token'])
        }
    }
    xhr.send()
}