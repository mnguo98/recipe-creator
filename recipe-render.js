
//82278202631f441d86817f98bb2f9f49
//5a38fb37355b47168d33551d70f5b0ec
//76bf86b96e604b5581c4fd8e10f51933
export async function loadRec() {
    const $root = $('#root');
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/random?apiKey=c0e9b2b394c2436b9bfd1f03efff452e',
        number:1
      });
      let rec = result.data;
      let inglist = [];
      let randRec = '<div>'
                    +'<h1 class ="title is-3">' + rec.recipes[0].title + '</h1>'
                    +'<img src=' + rec.recipes[0].image + '></img>'
                    +'<h2 class ="title is-5"> Cook Time: '+rec.recipes[0].readyInMinutes+' Minutes </h2>'
                    +'<h2 class ="title is-5"> Number of Servings: '+rec.recipes[0].servings+' Portions </h2>'
                    +'<h2 class ="title is-5"> Part of these Diet(s): '+rec.recipes[0].diets+' </h2>'
                    +'<h2 class ="title is-4"> Ingredients: </h2>'
                    +'<ul class="subtitle is-5">';
      for(let i=0;i<rec.recipes[0].extendedIngredients.length;i++)
      {
        var ing = rec.recipes[0].extendedIngredients[i].original;
        randRec += '<p>'+ing+'</p>';
      }
        randRec += '</ul><br>'
                    +'<h2 class ="title is-4"> Instructions: </h2>'
                    +'<h3 class="subtitle is-5">'+rec.recipes[0].instructions+'</h3>'
                    +'</div><br>';
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
  const $randoms = $('#random');
  let rands = JSON.parse(window.localStorage.getItem('public'));
  if (rands === null) {
    $randoms.append(`<h5></h5>`);
  } else {
    for (let i=0; i<10; i++) {
      if (rands[i] === undefined) {
        break;
      }
      $randoms.append(`<h5 class="subtitle is-5">${i+1}. ${rands[rands.length-i-1]}</h5>`);
    }
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