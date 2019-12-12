
//82278202631f441d86817f98bb2f9f49
//5a38fb37355b47168d33551d70f5b0ec


export const loadRecs=async function(event) {
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
      console.log(rec);
      console.log((typeof rec['pairedWines']));

      if((typeof rec['pairedWines'])==='undefined')
      {
        $appendhere.append(
          '<div>'
        +'<h1>'+rec['message']+'</h1>'
        +'</div>');
      }
      else if(rec['pairedWines'].length==0)
      {
        $appendhere.append(
          '<div>'
        +'<h1> Could not find a wine pairing for '+ings+'</h1>'
        +'</div>');
      }
      else
      {

      let pairedwineslist ="";
      for(let k=0;k<rec['pairedWines'].length;k++)
      {
        if(k!=rec['pairedWines'].length-1)
        {
          pairedwineslist+=rec['pairedWines'][k]+",";
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
        +'</div>');
      }

}
        
  
  const notUserPage = `
    <h1 class="title is-2">You must be logged in to use this function.</h1>
    <h2 class="subtitle is-4">Click below to login or create and account</h2>
    <input id="toLogin" className="button is-primary" class ="button is-info" type="submit" value="Go to Login Page" onclick="window.location.href = 'login.html';">
  `;

  $(function() {
      if (window.sessionStorage.getItem('loggedIn') === 'true') {
        const $root = $('#root');
        $root.on('click','.searchbut',loadRecs);
        document.getElementById('toLogin').innerHTML = 'Account';
      }
      else {
        const $titles = $('#titles');
        const $root = $('#root');
        $titles.empty();
        $titles.append(notUserPage);
        $root.empty();
        document.getElementById('toLogin').innerHTML = 'Login';
      }
  });
  