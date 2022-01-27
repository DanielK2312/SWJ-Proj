
// Login Submit Function
const loginButton = document.getElementById("login-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const loginForm = document.getElementById("login-form");

    var url = "https://swj-capstone-staging.herokuapp.com/api/auth/login";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.responseText);
        if(JSON.parse(xhr.responseText)['status'] == 'Logged in') {
            localStorage.setItem('accessToken', JSON.parse(xhr.responseText)['token'])
            window.location.replace("https://swj-capstone-staging.herokuapp.com/admin")
        } else {
            // Go through login errors...
        }
    }};

    var data = `email=${loginForm.username.value}&password=${loginForm.password.value}`

    xhr.send(data);
});