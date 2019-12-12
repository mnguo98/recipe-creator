function renderPage() {
    return `<div class="website hero is-info">
                <br><h1 class="title is-1 is-dark">Recipe Creator</h1><br>
        </div>
        <div class="topnav">
                <a class="mainpage" href="index.html">Home</a>
                <a class="selrecipes" href="random_recipe.html">Random Recipe</a>
                <a class="blog" href="blog.html">Wine Pairing Search</a>
                <a class="about" href="about.html">About</a>
                <a class="login" href="login.html">Login</a>
        </div>
        <br>
        <br>
        <center>
        <div className="box has-background-white content" >
            <h3 className="has-text-dark" class="title is-3">Login</h3>
            <form id="loginform">
                <div class="loginfield" className="field">
                        <input className="input" placeholder="Username" type="text" name="name" class="input is-medium" />
                </div>
                <div class="loginfield" className="field">
                        <input className="input" placeholder="Password" type="password" name="pass" class="input is-medium" />
                </div>
                <br>
                <input class="login button is-info" className="button is-primary" type="submit" value=Login />
                <h5 id="loginmes"><h5>
            </form>
        </div>
        </center>
        <br>
        <br>
        <br>
        <br>
        <center>
        <div className="box has-background-white content">
            <h3 className="has-text-dark" class="title is-3">Create Account</h3>
            <form id="form">
                <div class="field" className="field">
                        <input className="input" placeholder="Username" type="text" name="name" class="input is-medium"/>
                </div>
                <div class="field" className="field">
                        <input className="input" placeholder="Password" type="password" name="pass" class="input is-medium" />
                </div>
                <div class="field" className="field">
                        <input className="input" placeholder="Name" type="text" name="fullname" class="input is-medium" />
                </div>
                <br>
                <input class="submit button is-info" className="button is-primary" type="submit" value=Create />
                <h5 id="createmes"><h5>
            </form>
        </div>
        </center>
        `
}

const loggedInPage = 
    `
    <div class="website hero is-info">
        <br><h1 class="title is-1 is-dark">Recipe Creator</h1><br>
    </div>
    <div class="topnav">
        <a class="mainpage" href="index.html">Home</a>
        <a class="selrecipes" href="random_recipe.html">Random Recipe</a>
        <a class="blog" href="blog.html">Wine Pairing Search</a>
        <a class="about" href="about.html">About</a>
        <a class="login" href="login.html">Account</a>
    </div>
    <div>
        <div class="cols">
            <h4 id="centered" class = "subtitle is-5">Logged in as <h4>
            <input class="logout button is-info" className="button is-primary" type="submit" value=Logout />
            <input class="deletes button is-info" className="button is-primary" type="submit" value="Delete Account" />
        </div>
        <br>
        <input id="change" className="button is-primary" type="submit" value="Change Password" class="button is-info" />
    </div>
    <br>
    <br>
    `;

    
    
const changePasswordPage = 
`
<div class="website hero is-info">
    <br><h1 class="title is-1 is-dark">Recipe Creator</h1><br>
</div>
<div class="topnav">
    <a class="mainpage" href="index.html">Home</a>
    <a class="selrecipes" href="random_recipe.html">Random Recipe</a>
    <a class="blog" href="blog.html">Wine Pairing Search</a>
    <a class="about" href="about.html">About</a>
    <a class="login" href="login.html">Account</a>
</div>
<div>
    <div class="cols">
        <h4 id="centered" class = "subtitle is-5">Logged in as <h4>
        <input class="logout button is-info" className="button is-primary" type="submit" value=Logout />
        <input class="deletes button is-info" className="button is-primary" type="submit" value="Delete Account" />
    </div>
    <br>
    <br>
    <div class="passchange">
        <input class="change input is-small" type="password"/>
        <br>
        <input class="confirm button is-info" className="button is-primary" type="submit" value=Confirm />
        <input class="cancel button is-info" className="button is-primary" type="submit" value="Cancel" />
    <div>
</div>
<br>
<br>
`;

function renderLoggedIn(name) {
    const $root = $('#root');
    $root.empty();
    $root.append(loggedInPage);
    document.getElementById("centered").innerHTML += name;
    window.sessionStorage.setItem('loggedIn', 'true');
    window.sessionStorage.setItem('logInAcc', name);
    $root.on('click', '.logout', handleLogout);
    $root.on('click', '.deletes', handleDelete);
    $root.on('click', '#change', handleChangePassword);    
    renderSearchHistory();
}

function renderSearchHistory() {
    const $root = $('#root');
    let username = window.sessionStorage.getItem('logInAcc');
    let accounts = JSON.parse(window.localStorage.getItem('accounts'));
    let fullname = '';
    for (let i=0; i<accounts.length; i++) {
        if (accounts[i]['username'] === username) {
            fullname = accounts[i]['fullname'];
            break;
        }
    }
    let div = "<center><div class='hero is-info'><h2 id='hist' class='title is-2'>Search History for " + fullname + "<h2>";
    let userHistory = JSON.parse(window.localStorage.getItem('user'))[username];
    for (let i=0; i<10; i++) {
        if (userHistory[userHistory.length-i-1] === undefined) {
            break;
        }
        else {
            let j=i+1;
            div += 
                "<div class='histrec' id='rec" + i + "'>" + 
                   "<center> <h4 class='subtitle is-2'>" + j + ". " + userHistory[userHistory.length-j] + "</h4></center>" +
                "</div>";
        }
    }
    div += "</div></center>";
    $root.append(div);
}

export const handleDelete = async function(event) {
    const $root = $('#root');
    $root.empty();
    $root.append(renderPage());
    // $root.on('click', '.submit', handleCreate);
    $root.on('click', '.login', handleLogin);
    let accs = JSON.parse(window.localStorage.getItem('accounts'));
    for (let i=0; i<accs.length; i++) {
        if (accs[i]['username'] === window.sessionStorage.getItem('logInAcc')) {
            accs.splice(i, 1);
            break;
        }
    }
    window.localStorage.setItem('accounts', JSON.stringify(accs));
    let users = JSON.parse(window.localStorage.getItem('user'));
    delete users[window.sessionStorage.getItem('logInAcc')];
    window.localStorage.setItem('user', JSON.stringify(users));
    window.sessionStorage.setItem('loggedIn', 'false');
    window.sessionStorage.setItem('logInAcc', '');
}

export const handleChangePassword = async function(event) {
    const $root = $('#root');
    $root.empty();
    $root.append(changePasswordPage);
    document.getElementById("centered").innerHTML += window.sessionStorage.getItem('logInAcc');
    $root.on('click', '.confirm', handleSubmit);
    $root.on('click', '.cancel', handleCancel);
    renderSearchHistory();
}

export const handleSubmit = async function(event) {
    let obj = event.target.parentElement;
    let accounts = JSON.parse(window.localStorage.getItem('accounts'));
    for (let i=0; i<accounts.length; i++) {
        if (accounts[i]['username'] === window.sessionStorage.getItem('logInAcc')) {
            accounts[i]['password'] = obj.getElementsByClassName('change')[0].value;
            break;
        }
    }
    window.localStorage.setItem('accounts', JSON.stringify(accounts));
    renderLoggedIn(window.sessionStorage.getItem('logInAcc'));
}

export const handleCancel = async function(event) {
    renderLoggedIn(window.sessionStorage.getItem('logInAcc'));
}

export const handleLogout = async function(event) {
    const $root = $('#root');
    $root.empty();
    $root.append(renderPage());
    window.sessionStorage.setItem('loggedIn', 'false');
    window.sessionStorage.setItem('logInAcc', '');
    // $root.on('click', '.submit', handleCreate);
    $root.on('click', '.login', handleLogin);
}

export const handleLogin = async function(event) {
    const form = event.target.parentElement;
    const elements = form.getElementsByClassName("loginfield");
    const username = elements[0].getElementsByTagName("input")[0].value;
    const password = elements[1].getElementsByTagName("input")[0].value;
    let accounts = JSON.parse(window.localStorage.getItem('accounts'));
    let exists = false;
    let index = -1;
    for (let i=0; i<accounts.length; i++) {
        if (accounts[i]['username'] === username) {
            exists = true;
            index = i;
            break;
        }
    }
    if (exists) {
        if (accounts[index]['password'] === password) {
            event.preventDefault();
            renderLoggedIn(username);
        }
        else {
            event.preventDefault();
            document.getElementById("loginmes").innerHTML = 'Incorrect Username or Password';
        }
    } 
    else {
        event.preventDefault();
        document.getElementById("loginmes").innerHTML = 'No account associated with this username';
    }
}

export const handleCreate = function(event) {
    event.preventDefault();
    // console.log(JSON.parse(window.localStorage.getItem('accounts')));
    const form = event.target.parentElement;
    const elements = form.getElementsByClassName("field");
    const username = elements[0].getElementsByTagName("input")[0].value;
    const password = elements[1].getElementsByTagName("input")[0].value;
    const fullname = elements[2].getElementsByTagName("input")[0].value;
    let exists = false;
    if (window.localStorage.getItem('accounts') === null) {
        let array = [];
        array.push({'username': username, 'password': password, 'fullname': fullname});
        window.localStorage.setItem('accounts', JSON.stringify(array));
        document.getElementById("createmes").innerHTML = 'Account successfully created';
        addToUsers(username);
    } else {
        let accounts = JSON.parse(window.localStorage.getItem('accounts'));
        for (let i=0; i<accounts.length; i++) {
            if (accounts[i]['username'] === username) {
                exists = true;
                break;
            }
        }
        if (!(exists)) {
            accounts.push({'username': username, 'password': password, 'fullname': fullname});
            window.localStorage.setItem('accounts', JSON.stringify(accounts));
            document.getElementById("createmes").innerHTML = 'Account successfully created';
            addToUsers(username);
        } else {
            document.getElementById("createmes").innerHTML = 'Account already exists';
        }
    }
}

function addToUsers(username) {
    if (window.localStorage.getItem('user') === null) {
        let accountInfo = {};
        accountInfo[username] = [];
        window.localStorage.setItem('user', JSON.stringify(accountInfo));
    } else if (JSON.parse(window.localStorage.getItem('user'))[username] === undefined) {
        let users = JSON.parse(window.localStorage.getItem('user'));
        users[username] = [];
        window.localStorage.setItem('user', JSON.stringify(users));
    }
}

$(function() {
    if (window.sessionStorage.getItem('loggedIn') === 'true') {
        renderLoggedIn(window.sessionStorage.getItem('logInAcc'));
    } else {
        const $root = $('#root');
        $root.empty();
        $root.append(renderPage());
        $root.on('click', '.submit', handleCreate);
        $root.on('click', '.login', handleLogin);
    }
});