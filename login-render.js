function renderPage() {
    return `<div class="website">
                <h1>Recipe Creator</h1>
        </div>
        <div class="topnav">
                <a class="mainpage" href="index.html">Home</a>
                <a class="selrecipes" href="random_recipe.html">Random Recipe</a>
                <a class="blog" href="blog.html">Wine Pairing Search</a>
                <a class="about" href="about.html">About</a>
                <a class="login" href="login.html">Login</a>
        </div>
        <br>
        <div className="box has-background-white content">
            <h3 className="has-text-dark">Login</h3>
            <form id="loginform">
                <div class="loginfield" className="field">
                        <input className="input" placeholder="Username" type="text" name="name" />
                </div>
                <div class="loginfield" className="field">
                        <input className="input" placeholder="Password" type="password" name="pass" />
                </div>
                <input class="login" className="button is-primary" type="submit" value=Login />
                <h5 id="loginmes"><h5>
            </form>
        </div>
        <br>
        <div className="box has-background-white content">
            <h3 className="has-text-dark">Create Account</h3>
            <form id="form">
                <div class="field" className="field">
                        <input className="input" placeholder="Username" type="text" name="name" />
                </div>
                <div class="field" className="field">
                        <input className="input" placeholder="Password" type="password" name="pass" />
                </div>
                <input class="submit" className="button is-primary" type="submit" value=Create />
                <h5 id="createmes"><h5>
            </form>
        </div>
        `
}

const loggedInPage = 
    `
    <div class="website">
        <h1>Recipe Creator</h1>
    </div>
    <div class="topnav">
        <a class="mainpage" href="index.html">Home</a>
        <a class="selrecipes" href="random_recipe.html">Random Recipe</a>
        <a class="blog" href="blog.html">Wine Pairing Search</a>
        <a class="about" href="about.html">About</a>
        <a class="login" href="login.html">Account</a>
    </div>
    <br>
    <div>
        <h2 id="centered">You are logged in as <h2>
        <input class="logout" className="button is-primary" type="submit" value=Logout />
    </div>
    `;

function renderLoggedIn(name) {
    const $root = $('#root');
    $root.empty();
    $root.append(loggedInPage);
    document.getElementById("centered").innerHTML += name;
    window.sessionStorage.setItem('loggedIn', 'true');
    window.sessionStorage.setItem('logInAcc', name);
    $root.on('click', '.logout', handleLogout);

}

export const handleLogout = async function(event) {
    const $root = $('#root');
    $root.empty();
    $root.append(renderPage());
    window.sessionStorage.setItem('loggedIn', 'false');
    window.sessionStorage.setItem('logInAcc', '');
    $root.on('click', '.submit', handleCreate);
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
    const form = event.target.parentElement;
    const elements = form.getElementsByClassName("field");
    const username = elements[0].getElementsByTagName("input")[0].value;
    const password = elements[1].getElementsByTagName("input")[0].value;
    if (window.localStorage.getItem('accounts') === null) {
        let array = [];
        array.push({'username': username, 'password': password});
        window.localStorage.setItem('accounts', JSON.stringify(array));
        addToUsers(username);
    } else {
        let accounts = JSON.parse(window.localStorage.getItem('accounts'));
        let exists = false;
        for (let i=0; i<accounts.length; i++) {
            if (accounts[i]['username'] === username) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            accounts.push({'username': username, 'password': password});
            window.localStorage.setItem('accounts', JSON.stringify(accounts));
            document.getElementById("createmes").innerHTML = 'Account successfully created';
            // if (window.localStorage.getItem('user') === null);
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
        // console.log(accountInfo);
        window.localStorage.setItem('user', JSON.stringify(accountInfo));
        console.log(JSON.parse(window.localStorage.getItem('user')));
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