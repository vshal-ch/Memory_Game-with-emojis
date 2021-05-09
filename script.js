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
let cards=document.querySelectorAll('.backpart');
let emojis=['url("./emojis/1F603.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F606.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F609.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F642.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F643.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)','url("./emojis/1F928.svg") no-repeat center, linear-gradient(0deg,#1e1e1e,#1e1e1e)'];
for(let i=0;i<6;i++){
    cards[places_array[i][0]].style.background=emojis[i];
    cards[places_array[i][1]].style.background=emojis[i];
}
let frontparts=document.querySelectorAll('.frontpart');
let clicked=null;
let index=null;
let flag=false;
for(let i=0;i<12;i++){
    frontparts[i].addEventListener('click', () => {
        let innerflag=false;
        frontparts[i].parentElement.classList.add('active');
        if(flag){
            let t=index
            if(cards[t].style.backgroundImage!=cards[i].style.backgroundImage){
                setTimeout(function(){
                    frontparts[t].parentElement.classList.remove('active');
                    frontparts[i].parentElement.classList.remove('active');
                    flag=false;
                    innerflag=true;
                },750);
            }
            else{
                frontparts[i].style.pointerEvents='none';
                frontparts[t].style.pointerEvents='none';
                cards[i].parentElement.style.pointerEvents='none';
                cards[t].parentElement.style.pointerEvents='none';
                setInterval(() => {
                    str=cards[i].style.backgroundImage;
                    str1=cards[t].style.backgroundImage
                    cards[i].style.backgroundImage=str.substr(0,str.length-55)+'linear-gradient(0deg, rgb(1, 250, 30), rgb(1, 250, 30))';
                    cards[t].style.backgroundImage=str1.substr(0,str.length-55)+'linear-gradient(0deg, rgb(1, 250, 30), rgb(1, 250, 30))';
                },500);
                
                flag=false;
                innerflag=true;
                if(checkIfWon()){
                    alert('You won');
                    window.onbeforeunload= () => {
                        return null;
                    }
                    location.reload();
                }
            }
        }
        frontparts[i].parentElement.classList.add('active');
        cards[i].classList.add('onscreen');
        index=i;
        if(!(innerflag)){
            flag=true;
        }
    });
}

const checkIfWon = () => {
    let c=0;

    for(let i = 0;i<12;i++){
        if(frontparts[i].parentElement.classList.contains('active')){
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
    return 'Game will be restarted';
}