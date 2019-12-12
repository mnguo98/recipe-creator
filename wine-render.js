
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
    url: 'https://api.spoonacular.com/food/wine/pairing?food='+ings+'&apiKey=f253b44ee70b4afa880343e3333db0ce',
    });
    let rec = result.data;

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
    +'<h1>Wine Pairing(s)</h1>'
    +'<h3>'+rec['pairingText']+'</h3>'
    +'<h2> Paired Wine Types: '+pairedwineslist+'</h2>'
    +'<h1> Wine of Choice</h1>'
    +'<h2>'+rec['productMatches'][0]['title']+'</h2>'
    +'<img src=' + rec['productMatches'][0]['imageUrl'] + '></img>'
    +'<h3>'+rec['productMatches'][0]['price']+'</h3>'
    +'<h3>'+rec['productMatches'][0]['description']+'</h3>'
    +'</div>'
  );

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
    for (let i=0; i<pairs.length; i++) {
      $other.append(`<h5>${i+1}. ${pairs[pairs.length-i-1]}</h5>`);
    }
  }
}  

const notUserPage = `
  <h1>You must be logged in to use this function.</h1>
  <h2>Click below to login or create and account</h2>
  <a href="login.html"><button>Go To Login Page</button></a>
`;

$(function() {
    if (window.sessionStorage.getItem('loggedIn') === 'true') {
      const $root = $('#root');
      $root.on('click','.searchbut',loadRecs);
      document.getElementById('toLogin').innerHTML = 'Account';
      $root.append(`<br><h2>Recently Searched Pairings<h2><div id="otherpairs"></div>`);
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
  