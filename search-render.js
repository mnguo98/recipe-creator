
//82278202631f441d86817f98bb2f9f49
//5a38fb37355b47168d33551d70f5b0ec


export const loadRecs=async function(event) {
  event.preventDefault();
  
  const $root = $('#root');
  const $appendhere = $('#appendhere');
  
  $appendhere.empty();
  

  const form= event.target.parentElement;
  const ings = form.getElementsByClassName("ingslist")[0].value;
  var finalings="";
  //ings = "apples,orange,sugar"
  for(let k=0;k<ings.length;k++)
  {
    if(ings[k]===",")
    {
      finalings+=",+";
    }
    else{
      finalings+=ings[k];
    }

  }

      const result = await axios({
      method: 'get',
      url: 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='+finalings+'&apiKey=c0e9b2b394c2436b9bfd1f03efff452e',
      });
      let rec = result.data;      

      let arrayofids = new Array();
      var listofids ="";
      console.log(rec);
      if(rec.length==0){
        let recipeCard = '<div>'
                        +'<h1 class="title is-2">No recipes found for those ingredients.</h1>'
                        +'</div>';
          $appendhere.append(recipeCard);
      }
      else{
      for (let j=0;j<rec.length;j++)
      {
        listofids += rec[j]['id'].toString();
        if(j!=rec.length-1)
        {
          listofids+=",";
        }
        
  
    
      }
      const result2 = await axios({
          method: 'get',
          url: 'https://api.spoonacular.com/recipes/informationBulk?ids='+listofids+'&apiKey=c0e9b2b394c2436b9bfd1f03efff452e'
        });
        let arrayofrecs = new Array();
        arrayofrecs = result2.data;
        for(let l=0;l<arrayofrecs.length;l++)
        {
          var currec = arrayofrecs[l];
          let inglist = [];
          let recipeCard = '<div>'
                        +'<h1 class ="title is-3">' + currec.title + '</h1>'
                        +'<img src=' + currec.image + '></img>'
                        +'<h2 class ="title is-5"> Cook Time: '+currec.readyInMinutes+' Minutes </h2>'
                        +'<h2 class ="title is-5"> Number of Servings: '+currec.servings+' Portions </h2>'
                        +'<h2 class ="title is-5"> Part of these Diet(s): '+currec.diets+' </h2>'
                        +'<h2 class ="title is-4"> Ingredients: </h2>'
                        +'<ul class="subtitle is-5">';
          for(let i=0;i<currec.extendedIngredients.length;i++)
          {
            var ing = currec.extendedIngredients[i].original;
            recipeCard += '<p>'+ing+'</p>';

          }
          recipeCard += '</ul><br>'
                        +'<h2 class ="title is-4"> Instructions: </h2>'
                        +'<h3 class="subtitle is-5">'+currec.instructions+'</h3>'
                        +'</div><br>';
          $appendhere.append(recipeCard);
        }
        if (window.sessionStorage.getItem('loggedIn')) {
          let username = window.sessionStorage.getItem('logInAcc');
          let users = JSON.parse(window.localStorage.getItem('user'));
          if (users[username] !== undefined) {
            let query = cleanUpString(finalings);
            users[username].push(query);
            window.localStorage.setItem('user', JSON.stringify(users));
          }
        }
      }
    //   
}

function cleanUpString(ings) {
  let finalIngs = "";
  for(let k=0; k<ings.length; k++)
  {
    if(ings[k] === "+")
    {
      finalIngs += " ";
    }
    else{
      finalIngs += ings[k];
    }

  }
  return finalIngs;
}

$(function() {
    const $root = $('#root');
    $root.on('click','.searchbut',loadRecs);
    if (window.sessionStorage.getItem('loggedIn') === 'true') {
      document.getElementsByClassName('login')[0].innerHTML = 'Account';
    }
    else {
      document.getElementsByClassName('login')[0].innerHTML = 'Login';
    }
});
