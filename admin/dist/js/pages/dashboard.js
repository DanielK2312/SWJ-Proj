// httpOnly helper function
// will return bool on whether the cookie exists or not

function doesHttpOnlyCookieExist(cookieName) {
  var d = new Date();
  d.setTime(d.getTime() + (1000));
  var expires = "expires=" + d.toUTCString();

  document.cookie = cookieName + "=new_value;path=/;" + expires;
  return document.cookie.indexOf(cookieName + '=') == -1;
}

// On page load, check for auth
document.addEventListener("DOMContentLoaded", function(){
    // Check for access token
    const access_token = localStorage.getItem('swj-access');

    if (access_token == null) {
      const refresh_exists = doesHttpOnlyCookieExist('swj-refresh');

      if (refresh_exists) {
        // Attempt to refresh access
      } else {
        // Send to login window
        // window.location.replace("https://swj-capstone.herokuapp.com/admin/pages/login.html");
        window.location.replace("https://swj-capstone-staging.herokuapp.com/admin/pages/login.html");
      }
    }
});
