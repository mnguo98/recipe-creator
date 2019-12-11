// import {writeFile} from 'fs-web';
var test = require('fs');

function renderPage() {
    return `<div class="website">
                <h1>Recipe Creator</h1>
        </div>
        <div class="topnav">
                <a class="mainpage" href="index.html">Home</a>
                <a class="selrecipes" href="random_recipe.html">Random Recipe</a>
                <a class="blog" href="blog.html">Blog</a>
                <a class="about" href="about.html">About</a>
                <a class="login" href="login.html">Login</a>
        </div>
        <br>
        <h2>Login</h2>
        <div class="loginfield">
                <div class="loginusername">
                        <label>Username</label>
                        <input type="text" id="login_username">
                </div>
                <div class="loginpassword">
                        <label for="pass">Password</label>
                        <input type="text" id="login_password">
                </div>
                <button type="login">Login</button>
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
            </form>
        </div>
        `
}

export const handleSubmit = async function(event) {
    event.preventDefault();
    const form = event.target.parentElement;
    const elements = form.getElementsByClassName("field");
    const username = elements[0].getElementsByTagName("input")[0].value;
    const password = elements[1].getElementsByTagName("input")[0].value;
    const obj = window.localStorage.getItem('accounts');
//     window.localStorage.setItem('accounts', {'username': username, 'password': password});
//     console.log(localStorage.getItem('accounts'));

    
//     await createAccount({username, password});
    // const form = event.target.getElem,ent
    // const id = event.target.getAttribute('data');
    // document.querySelectorAll('.card-footer-item.reply').forEach(function(el) {
    //     el.addEventListener('click', function() {
    //         let target = document.querySelector(el.getAttribute('data-target'));
    //         target.classList.add('is-active');
    //         target.querySelector('.modal-close').addEventListener('click', function() {
    //             target.classList.remove('is-active');
    //         });
    //         target.querySelector('.button').addEventListener('click', function() {
    //             reply(document.getElementById("replyTweet").value, id);
    //             target.classList.remove('is-active');
    //             document.getElementById("replyTweet").value = '';
    //         });
    //     });
    // });
}

$(function() {
    const $root = $('#root');
    $root.empty();
    $root.append(renderPage());
    $root.on('click', '.submit', handleSubmit);
//     for (let i=0; i<localStorage.length; i++) {
//         console.log(localStorage.key(i));
//     }
});

{/* <script>
async function func() {
        document.getElementById("form").addEventListener('submit', functSubmit);

        async function functSubmit(e) {
                console.log(e);
                e.preventDefault();
                const name = e.target.name.value;
                const pass = e.target.pass.value;
                await createAccount({name, pass});
        }
}
</script> */}