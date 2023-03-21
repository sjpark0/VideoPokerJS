import { CARD, TYPE } from "./CARD.js";
import { NUM_HAND, NUM_TOTAL, CheckCard } from "./CheckCard.js";
import { VideoPoker } from "./VideoPoker.js";

//document.write("test");

var g_numChange = 0;
var g_changeIdx = new Array();
var g_game = new VideoPoker();

var valCheckBox = new Array(NUM_HAND);
var valCheckBoxText = new Array(NUM_HAND);

valCheckBox[0] = document.getElementById("first_val");
valCheckBox[1] = document.getElementById("second_val");
valCheckBox[2] = document.getElementById("third_val");
valCheckBox[3] = document.getElementById("fourth_val");
valCheckBox[4] = document.getElementById("fifth_val");

valCheckBoxText[0] = document.getElementById("txt_first_val");
valCheckBoxText[1] = document.getElementById("txt_second_val");
valCheckBoxText[2] = document.getElementById("txt_third_val");
valCheckBoxText[3] = document.getElementById("txt_fourth_val");
valCheckBoxText[4] = document.getElementById("txt_fifth_val");

var resultText = document.getElementById("txt_result");
var statusText = document.getElementById("txt_status");

const btnGenerator = document.getElementById("btn_generator");
const btnAutoChange = document.getElementById("btn_autochange");
const btnApprove = document.getElementById("btn_approve");

btnGenerator.addEventListener('click', () => {
    var numChange = g_numChange;
    var changeIdx = new Array();


    for(var i=0;i<g_numChange;i++){
        changeIdx.push(g_changeIdx[i]);
    }
    for(var i=0;i<numChange;i++){
        valCheckBox[changeIdx[i]].checked = false;
        valCheckBox[changeIdx[i]].dispatchEvent(new Event('change'));
    }

    g_game.GenerateCARD();
    g_game.PrintHand();

    for(var i=0;i<NUM_HAND;i++){
        valCheckBoxText[i].innerText = g_game.PrintHandForString(i);
    }
    resultText.innerText = g_game.PrintResultForString();
    statusText.innerText = "Generate";
});

btnAutoChange.addEventListener('click', () => {
    var numChange = g_numChange;
    var changeIdx = new Array();

    for(var i=0;i<g_numChange;i++){
        changeIdx.push(g_changeIdx[i]);
    }
    for(var i=0;i<numChange;i++){
        valCheckBox[changeIdx[i]].checked = false;
        valCheckBox[changeIdx[i]].dispatchEvent(new Event('change'));
    }
  
    var values  = g_game.ChangeHandIdx()

    for(var i=0;i<values.second;i++){
        valCheckBox[values.first[i]].checked = true;
        valCheckBox[values.first[i]].dispatchEvent(new Event('change'));
    }
    
    changeIdx.sort(function(a, b){
        return a-b;
    });
    g_changeIdx.sort(function(a, b){
        return a-b;
    });
    
    if(g_numChange == numChange) {
        if(changeIdx.toString() == g_changeIdx.toString()) {
            statusText.innerText = "Correct"
        }
        else{
            statusText.innerText = "Incorrect1"
        }
    }
    else{
        statusText.innerText = "Incorrect2"
    }
});

btnApprove.addEventListener('click', () => {
    g_game.ReplaceChangeHandIdx(g_changeIdx, g_numChange)
    g_game.PrintHand()

    for(var i=0;i<NUM_HAND;i++){
        valCheckBoxText[i].innerText = g_game.PrintHandForString(i);
    }
    resultText.innerText = g_game.PrintResultForString()

    var numChange = g_numChange;
    var changeIdx = new Array();

    for(var i=0;i<g_numChange;i++){
        changeIdx.push(g_changeIdx[i]);
    }
    for(var i=0;i<numChange;i++){
        valCheckBox[changeIdx[i]].checked = false;
        valCheckBox[changeIdx[i]].dispatchEvent(new Event('change'));
    }
});

for(var i=0;i<NUM_HAND;i++){
    valCheckBox[i].idx = i;
    valCheckBox[i].addEventListener('change', CheckBoxChange);
}
function CheckBoxChange(event){
    if(event.target.checked){
        g_changeIdx.push(event.target.idx);
        g_numChange++;
    }
    else if(!event.target.checked){
        g_changeIdx.splice(g_changeIdx.indexOf(event.target.idx), 1);
        g_numChange--;
    }
    console.log(g_changeIdx);
}
