document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

const USER_INFO = {
    name: 'Admin',
    lastName: 'Admin',
}

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin'

let email = document.getElementById("email");
let password = document.getElementById("password");
let rememberMe = document.getElementById("rememberMe");
let login = document.getElementById("login");

checkCookie();

login.addEventListener('click', (event) => {
    
    
    if (email.value === ADMIN_EMAIL && password.value === ADMIN_PASSWORD) {
        if (rememberMe.checked) {
            setCookie("email", email.value, 30);
        }
        renderUserInfo(email.value);
    } else {
        alert("Email or password are incorrect");
    }
});


//function setCookie
function setCookie(cookieName, cookieValue, cookieExpDays) {
    let date = new Date();
    date.setTime(date.getTime() + (cookieExpDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

//function get cookie
function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");
    for (i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(cookie.length, name.length);
        }
    }
    return "";
}

//function check cookie
function checkCookie() {
    let user = getCookie("email");
    if (user != "") {
        renderUserInfo(user);
    }
}


function renderUserInfo(email) {
    
    document.body.innerHTML = `
  <p>
  	email: <span>${email}</span>
  </p>
  `
}