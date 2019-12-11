
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
  console.log(ings);
  console.log(finalings);
  console.log('https://api.spoonacular.com/recipes/findByIngredients?ingredients='+finalings+'&apiKey=82278202631f441d86817f98bb2f9f49');



      const result = await axios({
      method: 'get',
      url: 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='+finalings+'&apiKey=82278202631f441d86817f98bb2f9f49',
      });
      console.log(result);
      let rec = result.data;
      console.log(typeof rec[0]['id'].toString());
      console.log( rec[0]['id'].toString());
      

      let arrayofids = new Array();
      var listofids ="";

      for (let j=0;j<rec.length;j++)
      {
        listofids += rec[j]['id'].toString();
        if(j!=rec.length-1)
        {
          listofids+=",";
        }
        
  
    
      }
      console.log(listofids);
      const result2 = await axios({
          method: 'get',
          url: 'https://api.spoonacular.com/recipes/informationBulk?ids='+listofids+'&apiKey=82278202631f441d86817f98bb2f9f49'
        });
        console.log(result2.data)
        let arrayofrecs = new Array();
        arrayofrecs = result2.data;
        console.log(arrayofrecs);
        for(let l=0;l<arrayofrecs.length;l++)
        {
          var currec = arrayofrecs[l];
          let inglist = [];
          for(let i=0;i<currec.extendedIngredients.length;i++)
          {
            var ing = currec.extendedIngredients[i].original;
            var editing = ing.replace(",","");
            inglist.push('<p>'+editing+'</p>');
          }
          $appendhere.append(
            '<div>'
    +'<h1>' + currec.title + '</h1>'
    +'<img src=' + currec.image + '></img>'
    +'<h2> Cook Time: '+currec.readyInMinutes+' Minutes </h2>'
    +'<h2> Number of Servings: '+currec.servings+' Portions </h2>'
    +'<h2> Part of these Diet(s): '+currec.diets+' </h2>'
    +'<h2> Ingredients: </h2>'
    +'<ul>'
    +inglist
    +'</ul>'
    +'<h2> Instructions: </h2>'
    +'<h3>'+currec.instructions+'</h3>'
    +'</div>');
        }

    //   
}

$(function() {
    const $root = $('#root');
    $root.on('click','.searchbut',loadRecs);

});

// export const run = function() {
//   document.getElementById("searchbar").onclick("")
// }