
//82278202631f441d86817f98bb2f9f49
//5a38fb37355b47168d33551d70f5b0ec


export const loadRecs=async function(event) {
    event.preventDefault();
    const $root = $('#root');
    const $appendhere = $('#appendhere');
    $appendhere.empty();
    const form= event.target.parentElement;
    const ings = form.getElementsByClassName("winesearchbox")[0].value;
    console.log(typeof ings);

    var finalings="";
    //ings = "apples,orange,sugar"
    // for(let k=0;k<ings.length;k++)
    // {
    //   if(ings[k]===",")
    //   {
    //     finalings+=",+";
    //   }
    //   else{
    //     finalings+=ings[k];
    //   }
  
    // }
    // console.log(ings);
    // console.log(finalings);
    // console.log('https://api.spoonacular.com/recipes/findByIngredients?ingredients='+finalings+'&apiKey=76bf86b96e604b5581c4fd8e10f51933');
  
  
  
        const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/food/wine/pairing?food='+ings+'&apiKey=76bf86b96e604b5581c4fd8e10f51933',
        });
        console.log(result);
        let rec = result.data;
        console.log(rec['pairingText']);
        console.log(rec['productMatches']);
        console.log(rec['productMatches'][0]['title']);

        // console.log( rec[0]['id'].toString());
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

        
        
    
        //console.log(listofids);
        
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
    
  
      //   
  }
  
  $(function() {
      const $root = $('#root');
      $root.on('click','.searchbut',loadRecs);
  });
  
  // export const run = function() {
  //   document.getElementById("searchbar").onclick("")
  // }