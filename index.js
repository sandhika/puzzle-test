//Function that encodes “aaaabcccaaa” to “4ab3c3a”

function encodeString(arr){
    var result = "";
    var convArr= arr.split("");

    var lastCheck = convArr[0];
    var iCount = 0; 
    
    for(let i=0; i <= convArr.length ; i ++){
        //console.log('last: ',lastCheck, ' pos: ' ,convArr[i])
        if(lastCheck != convArr[i]){
            //var data = ; 

            result =result + (iCount > 1?iCount.toString():'') + lastCheck ;
            //console.log('=> ', result);
            iCount =0; //reset 
            lastCheck = convArr[i];
        }

        if(convArr[i] === lastCheck){            
            iCount++;
            //console.log('count', iCount);
        }

        lastCheck = convArr[i];
    }


    return result;
}



var arrData = "aaaabcccaaa";
var resultPrint = encodeString(arrData);

console.log('Test: ', arrData, ' => ', resultPrint);

