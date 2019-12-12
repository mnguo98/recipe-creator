$(function() {
    if (window.sessionStorage.getItem('loggedIn') === 'true') {
        document.getElementsByClassName('login')[0].innerHTML = 'Account';
    }
    else {
        document.getElementsByClassName('login')[0].innerHTML = 'Login';
    }
})