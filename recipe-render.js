
//82278202631f441d86817f98bb2f9f49
//5a38fb37355b47168d33551d70f5b0ec
//76bf86b96e604b5581c4fd8e10f51933
export async function loadRec() {
    const $root = $('#root');
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/random?apiKey=f0fa351f88f14b7ab0e2db17c5849bec',
        number:1
      });
      let rec = result.data;
      let inglist = [];
      for(let i=0;i<rec.recipes[0].extendedIngredients.length;i++)
      {
        var ing = rec.recipes[0].extendedIngredients[i].original;
        var editing = ing.replace(/,/g,'')
        inglist.push('<p>'+editing+'</p>');
      }
      let randRec = '<div>'
                    +'<h1>' + rec.recipes[0].title + '</h1>'
                    +'<img src=' + rec.recipes[0].image + '></img>'
                    +'<h2> Cook Time: '+rec.recipes[0].readyInMinutes+' Minutes </h2>'
                    +'<h2> Number of Servings: '+rec.recipes[0].servings+' Portions </h2>'
                    +'<h2> Part of these Diet(s): '+rec.recipes[0].diets+' </h2>'
                    +'<h2> Ingredients: </h2>'
                    +'<ul>'
                    +inglist
                    +'</ul>'
                    +'<h2> Instructions: </h2>'
                    +'<h3>'+rec.recipes[0].instructions+'</h3>'
                    +'</div>';
      $root.append(randRec);
      if (window.localStorage.getItem('public') === null) {
        let randomRecs = [];
        randomRecs.push(rec.recipes[0].title);
        window.localStorage.setItem('public', JSON.stringify(randomRecs));
      }
      else {
        let randomRecs = JSON.parse(window.localStorage.getItem('public'));
        randomRecs.push(rec.recipes[0].title);
        window.localStorage.setItem('public', JSON.stringify(randomRecs));
      }
}

function renderRandoms() {
  const $randoms = $('#randoms');
  let rands = JSON.parse(window.localStorage.getItem('public'));
  for (let i=0; i<rands.length; i++) {
    $randoms.append(`<h5>${i+1}. ${rands[rands.length-i-1]}</h5>`);
  }
}

$(function() {
    loadRec();
    renderRandoms();
    if (window.sessionStorage.getItem('loggedIn') === 'true') {
      document.getElementsByClassName('login')[0].innerHTML = 'Account';
    }
    else {
      document.getElementsByClassName('login')[0].innerHTML = 'Login';
    }
});