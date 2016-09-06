var suMain          = document.getElementById('suMain'),
    pass1           = document.getElementById('pass1'),
    pass2           = document.getElementById('pass2'),
    signupEmail     = document.getElementById('signupEmail'),
    handle          = document.getElementById('handle'),
    signupSubmit    = document.getElementById('signupSubmit'),
    loginSubmit     = document.getElementById('loginSubmit'),
    loginEmail      = document.getElementById('loginEmail'),
    loginPass       = document.getElementById('loginPass');

function loginSwitch() {
    suMain.className = (suMain.className == 'signup') ? 'login' : 'signup';
}

function checkSignupValidity() {
    signupSubmit.disabled = !(signupEmail.value.length &&
        signupEmail.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) &&
        pass1.value.length > 7 &&
        handle.value.length &&
        handle.value.length < 20 &&
        (pass1.value == pass2.value));
}

function checkLoginValidity() {
    loginSubmit.disabled = !(loginEmail.value.length &&
        loginEmail.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) &&
        loginPass.value.length > 7);
}

pass1.addEventListener('keyup', checkSignupValidity);
pass2.addEventListener('keyup', checkSignupValidity);
signupEmail.addEventListener('keyup', checkSignupValidity);
handle.addEventListener('keyup', checkSignupValidity);
loginEmail.addEventListener('keyup', checkLoginValidity);
loginPass.addEventListener('keyup', checkLoginValidity);
