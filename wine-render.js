
//82278202631f441d86817f98bb2f9f49
//5a38fb37355b47168d33551d70f5b0ec


export const loadRecs = async function(event) {
  event.preventDefault();
  const $root = $('#root');
  const $appendhere = $('#appendhere');
  $appendhere.empty();
  const form= event.target.parentElement;
  const ings = form.getElementsByClassName("winesearchbox")[0].value;


  var finalings="";
    const result = await axios({
    method: 'get',
    url: 'https://api.spoonacular.com/food/wine/pairing?food='+ings+'&apiKey=758067ecf20b4f84a4fff92935e8c36e',
    });
    let rec = result.data;
  
  console.log(rec['pairedWines']);

  if((typeof rec['pairedWines']) == 'undefined' )
  {
    $appendhere.append('<div>'
    +'<h1 class="title is-3">Wine Pairing(s) not found for '+ings+'</h1>'
    +'</div>');
  }
  else if(rec['pairedWines'].length==0)
  {
    $appendhere.append('<div>'
    +'<h1 class="title is-3">Wine Pairing(s) not found for '+ings+'</h1>'
    +'</div>');
  }
  
  else
  {
  let pairedwineslist ="";
  for(let k=0;k<rec['pairedWines'].length;k++)
  {
    if(k!=rec['pairedWines'].length-1)
    {
      pairedwineslist+=rec['pairedWines'][k]+", ";
    }
    else{
      pairedwineslist+=rec['pairedWines'][k];
    }

  }
  $appendhere.append(
      '<div>'
    +'<h1 class="title is-3">Wine Pairing(s)</h1>'
    +'<h3 class="subtitle is-5">'+rec['pairingText']+'</h3>'
    +'<h2 class ="title is-5"> Paired Wine Types: '+pairedwineslist+'</h2>'
    +'<h1 class ="title is-4"> Wine of Choice</h1>'
    +'<h2 class ="title is-5">'+rec['productMatches'][0]['title']+'</h2>'
    +'<img src=' + rec['productMatches'][0]['imageUrl'] + '></img>'
    +'<h3 class="subtitle is-5">'+rec['productMatches'][0]['price']+'</h3>'
    +'<h3 class="subtitle is-5">'+rec['productMatches'][0]['description']+'</h3>'
    +'</div>'

  );
}

  if (window.localStorage.getItem('private') === null) {
    let pairs = [];
    pairs.push(ings + ' and ' + rec['productMatches'][0]['title']);
    window.localStorage.setItem('private', JSON.stringify(pairs));
  } else {
    let pairs = JSON.parse(window.localStorage.getItem('private'));
    pairs.push(ings + ' and ' + rec['productMatches'][0]['title']);
    window.localStorage.setItem('private', JSON.stringify(pairs));
  }
}
        
function renderOtherPairs() {
  const $other = $('#otherpairs');
  let pairs = JSON.parse(window.localStorage.getItem('private'));
  if (pairs === null) {
    $other.append(`<h5></h5>`);
  } else {
    for (let i=0; i<10; i++) {
      if (pairs[i] === undefined) {
        break;
      }
      $other.append(`<h5 class="subtitle is-5">${i+1}. ${pairs[pairs.length-i-1]}</h5>`);
    }
  }
}  

const notUserPage = `
  <h1 class="title is-2">You must be logged in to use this function!</h1>
  <h2 class ="subtitle is-2">Click below to login or create an account.</h2>
  <a href="login.html"><button class="button is-info">Go To Login Page</button></a>
`;

$(function() {
    if (window.sessionStorage.getItem('loggedIn') === 'true') {
      const $root = $('#root');
      $root.on('click','.searchbut',loadRecs);
      document.getElementById('toLogin').innerHTML = 'Account';
      $root.append(`<br><h2 class="title is-4">Recently Searched Pairings<h2><div id="otherpairs"></div>`);
      renderOtherPairs();
    }
    else {
      const $titles = $('#titles');
      const $root = $('#root');
      $titles.empty();
      $titles.append(notUserPage);
      // $titles.on('click', '#toLogin', handleGoToLogin);
      $root.empty();
      document.getElementById('toLogin').innerHTML = 'Login';
    }
});
  