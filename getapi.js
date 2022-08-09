// MADE BY : SANDHIKA TRIA YOGASWARA
// EMAIL : sandhika.yogaswara@gmail.com
// For run the project you must install node.js and in termial write => node getapi.js

const axios = require('axios').default;

var arrVocabulary=[];
var arrCheckPuzzle=[];
var arrCheckIdPuzzle=[];

var arrPuzzle=[];
var strUrl = "https://test8020cto.herokuapp.com";

function generateRandom(maxLimit = 100){
    let rand = Math.random() * maxLimit;
    console.log(rand); // say 99.81321410836433
  
    rand = Math.floor(rand); // 99
  
    return rand;
}

function checkLength(word,len) {
    return (word.length === len);
}


 function getVocabulary(){
 axios.get(strUrl + '/vocabulary')
  .then(function (response) {
    // handle success
    
    arrVocabulary = response.data.vocabulary;
    console.log(arrVocabulary);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

function setCombination(){
  
    let arrCombination = [];
   
    let arrCouple =[]

        for(let i=0; i < arrPuzzle.length;i++){
       
            let pos=0;
            while(pos != arrPuzzle[i]){
                
                var item = arrVocabulary[Math.floor(Math.random() * arrVocabulary.length)];
                if(item){
                pos = item.toString().length;
                //console.log(pos);
                if(pos=== arrPuzzle[i])
                {
                    arrCouple.push(item);
                    //break;
                }
                }
            }



        }
    
        

    return arrCouple;
}

 function getPuzzle(id){
   axios.get(strUrl +'/get_puzzle?id=' + id)
  .then(function (response) {
    // handle success
    
    let strData = response.data.hint;
    console.log(strData);
    let dataSplit = strData.split(' ');
    arrPuzzle = [];
    for(let i =0; i <  dataSplit.length;i++){
        arrPuzzle.push(dataSplit[i].length);
    }

    console.log(arrPuzzle);

    let result =setCombination();
    console.log('Guess Puzzle: ',result);
    checkPuzzle(id,result);

   /// console.log(result);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

 function checkPuzzle(id,params){
    let strParams = "";
    
    for(let i=0;i < params.length;i++){
        strParams += params[i];

        if(i < params.length-1)
        strParams = strParams + '+';
    }

    let fullUrl = strUrl + '/guess?id=' + id + '&guess=' + strParams;

     axios.get(fullUrl)
    .then(function (response) {
      // handle success
      
      console.log( '##############################################################################################');
      console.log( 'THE RESULT : '); 
      console.log( fullUrl + '\n', response.data);
      console.log( '##############################################################################################');

    })
    .catch(function (error) {
      // handle error
      console.log( fullUrl);
      console.log(error.response.data);
  
    })
    .then(function () {
      // always executed
    });
}

console.log('### IF HANG JUST CTRL+C #####');
console.log('### IF ARRAY VOCALBULARY NOT SHOWN JUST CTRL+C #####');
//Step 1: Get the Vocabulary
getVocabulary();
setTimeout(() => {  console.log(""); }, 5000);
//Step 2: Get the puzzle & //Step 3: Guess
getPuzzle(0);
setTimeout(() => {  console.log(""); }, 5000);
getPuzzle(3);
//Step 4: Repeat