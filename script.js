// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
// ATTENTION LA CLE API SE PERIMME AU BOUT DE 24H!!!!!!!!!
const APIKey = `//votre cle API ici`;

const getData = async (url) => {
    const response = await fetch(url);
    
    if (response.status != 200) {
        throw new Error("Cannot fetch the data.");
    }
    
    const data = await response.json();
    return data;
}

//remplace les espaces en "%20"
function replaceName(){
    let tab = document.getElementById("namePlayer").value;
    //si jamais c'est cassé decommenter en dessous et rajouter "pseudo" a la place de "tab" dans l'appel de l'API
    //let pseudo = tab.replace(" ", "%20")
    
    getData(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${tab}?api_key=${APIKey}`)
    .then(data => {
        traitementDesDonnées(data);
        showIcon(data)
        //takeMasterys()
    })
    
    .catch(err => console.log("rejected\n", err.message))
}

function traitementDesDonnées(data) {
    let name = data.name;
    let level = data.summonerLevel;
    let revisionDate = data.revisionDate;
    let sumId = data.id;    
    let icone = data.profileIconId;
    //console.log(name);
    // console.log(icone);
    // console.log(level);
    // console.log(revisionDate);
    // console.log(sumId);
    
    document.getElementById("name").innerHTML = "mon pseudo est : " + name;
    //document.getElementById("icone").innerHTML = "voici mon icone d'invoquateur : " + icone;
    document.getElementById("level").innerHTML = "mon level est : " + level;
    document.getElementById("date").innerHTML = revisionDate;
    takeMasterys(sumId)
    showIcon(icone)
}

function showIcon(icone) {
    if (icone >= 0 && icone <= 5754) {
        document.querySelector("#iconePlayer").innerHTML = "<img src=\"profileicon/" + icone + ".png\">"
    }
}



const getData2 = async (url) => {
    const response = await fetch(url);
    
    if (response.status != 200) {
        throw new Error("Cannot fetch the data.");
    }
    
    const data2 = await response.json();
    return data2;
}


function takeMasterys(sumId){
    getData2(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${sumId}?api_key=${APIKey}`)
    .then(data2 => {
        showMasterys(data2);
        // console.log("i");
    })
    
    .catch(err => console.log("rejected\n", err.message))
    console.log(sumId);
}


function showMasterys(data2){

    let champId1 = data2[0].championId;
    let champId2 = data2[1].championId;
    let champId3 = data2[2].championId;
    // let lvlMastery = data2[0].championLevel;
    //let nbPoints = data2[0].championPoints;
    
    document.getElementById("pointsMastery1").innerHTML = data2[0].championPoints
    document.getElementById("pointsMastery2").innerHTML = data2[1].championPoints
    document.getElementById("pointsMastery3").innerHTML = data2[2].championPoints
    
    // affiche l'icone du champion avec la plus haute mastery
    if (champId1 >= 1 && champId1 <= 902) {
        document.querySelector("#champIcon1").innerHTML = "<img src=\"champ_icon/" + champId1 + ".png\">";
    }

    if (champId2 >= 1 && champId2 <= 902) {
        document.querySelector("#champIcon2").innerHTML = "<img src=\"champ_icon/" + champId2 + ".png\">";
    }

    if (champId3 >= 1 && champId3 <= 902) {
        document.querySelector("#champIcon3").innerHTML = "<img src=\"champ_icon/" + champId3 + ".png\">";
    }
    
    // affiche le maitrise 7 ASAGIII!!!!!!
    if (data2[0].championLevel >= 1 && data2[0].championLevel <= 7) {
        document.querySelector("#lvlMastery1").innerHTML = "<img src=\"masterys/mastery_level" + data2[0].championLevel + ".png\">";
    }  
    
    if (data2[1].championLevel >= 1 && data2[1].championLevel <= 7) {
        document.querySelector("#lvlMastery2").innerHTML = "<img src=\"masterys/mastery_level" + data2[1].championLevel + ".png\">";
    }   

    if (data2[2].championLevel >= 1 && data2[2].championLevel <= 7) {
        document.querySelector("#lvlMastery3").innerHTML = "<img src=\"masterys/mastery_level" + data2[2].championLevel + ".png\">";
    }   
}



const getData3 = async (url) => {
    const response = await fetch(url);
    
    if (response.status != 200) {
        throw new Error("Cannot fetch the data.");
    }
    
    const data3 = await response.json();
    return data3;
}

function statRank(sumId){
    getData3(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}?api_key=${APIKey}`)
    .then(data3 => {
        takeStat(data3)
    })
    
    .catch(err => console.log("rejected\n", err.message))
    console.log(sumId);
}

function takeStat(data3) {
    console.log(data3);
}
