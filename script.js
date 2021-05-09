const getRand = () => {
    let rand=Math.floor(Math.random()*12);
    return rand;
};
const generateRandomPlaces = () => {
    let array=[];
    for(let i=0;i<12;i++){
        let randnum=getRand();
        while(array.includes(randnum)){
            randnum=getRand();
        }
        array.push(randnum);
    }
    let nArray=[];
    for(let i=0;i<12;i+=2){
        let sArray=[];
        sArray.push(array[i]);
        sArray.push(array[i+1]);
        nArray.push(sArray);
    }
    return nArray;
};

places_array=generateRandomPlaces();

let cards=document.querySelectorAll('.card');
let emojis=['url("./emojis/1F603.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F606.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F609.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F642.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F643.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F928.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)'];


for(let i=0;i<6;i++){
    cards[places_array[i][0]].style.background=emojis[i];
    cards[places_array[i][1]].style.background=emojis[i];
}

const restartGame = () => {
    places_array=generateRandomPlaces();

    console.log(places_array);

    cards=document.querySelectorAll('.card');
    emojis=['url("./emojis/1F603.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F606.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F609.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F642.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F643.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F928.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)'];


    for(let i=0;i<6;i++){
        cards[places_array[i][0]].style.background=emojis[i];
        cards[places_array[i][1]].style.background=emojis[i];
    }
    for(let i=0;i<12;i++){
        frontparts[i].style.backgroundColor='#1e1e1e';
    }

    console.log(cards[1].style.background);
}

let frontparts=document.querySelectorAll('.frontpart');

let clicked=null;
let index=null;
let flag=false;
for(let i=0;i<12;i++){
    frontparts[i].addEventListener('click',() => {

        let innerflag=false;
        if(frontparts[i].style.backgroundColor=='transparent'){
            innerflag=true;
        }
       
        frontparts[i].style.backgroundColor='transparent';
        if(flag){
            let t=index;
            if(t!=i&&frontparts[i].style.display=='flex'){
                flag=true;
                innerflag=true;
            }
            if(t==i){
                frontparts[t].style.backgroundColor='transparent';
                flag=true;
            }
            
            else if(cards[t].style.backgroundImage!=cards[i].style.backgroundImage){
                
                setTimeout(function(){
                    frontparts[t].style.backgroundColor='#1e1e1e';
                    frontparts[i].style.backgroundColor='#1e1e1e';
                    flag=false;
                    innerflag=true;
                },500);
            } 
            else{
                frontparts[t].style.pointerEvents='none';
                frontparts[i].style.pointerEvents='none';
                flag=false;
                innerflag=true;
            }
        }
        index=i;
        if(!(innerflag)){
            flag=true;
        }
        if(checkIfWon()){
            alert('You won');
            console.log('debug');
            window.onbeforeunload= () => {
                return null;
            }
            location.reload();
        }
    });
}

const checkIfWon = () => {
    let c=0;
    for(let i = 0;i<12;i++){
        if(frontparts[i].style.backgroundColor=='transparent'){
            c++;
        }
    }
    if(c==12){
        return true;
    }
    else{
        return false;
    }
}

window.onbeforeunload = () => {
    return 'Game data will be cleared';
}