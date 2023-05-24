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
    })
    
    .catch(err => console.log("rejected\n", err.message))
}

function traitementDesDonnées(data) {
    let name = data.name;
    let level = data.summonerLevel;
    let revisionDate = data.revisionDate;
    sumId = data.id;    
    let icone = data.profileIconId;
    let puuid = data.puuid;
    //console.log(name);
    // console.log(icone);
    // console.log(level);
    // console.log(revisionDate);
    console.log(sumId);
    console.log(puuid);
    
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
        statRank()
    })
    
    .catch(err => console.log("rejected\n", err.message))
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


function statRank(){
    getData3(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}?api_key=${APIKey}`)
    .then(data3 => {
       statSolo(data3)
       statFlex(data3)
    //    statSolo2(data3)
    })
    
    .catch(err => console.log("rejected\n", err.message))
}


function statSolo(data3){
    //console.log(data3);
    if (data3[0].queueType == "RANKED_SOLO_5x5")
        takeStatSolo(data3)
        // console.log("solo");
    else if (data3[1].queueType == "RANKED_FLEX_SR")
        takeStatFlex(data3)
        // console.log("flex");
}

// function statSolo2 (data3) {
//     if(data3[0].queueType == "RANKED_SOLO_5x5" && data3[1].queueType == "RANKED_FLEX_SR")
//         takeStatSolo(data3)
//     else if (data3[1].queueType == "RANKED_SOLO_5x5" && data3[0].queueType == "RANKED_FLEX_SR")
//         takeStatFlex(data3)
// }

function takeStatSolo(data3) {
    let solo = ""
    let rank = data3[0].tier
    let division = data3[0].rank
    let win = data3[0].wins
    let lose = data3[0].losses
    let winRate = (win / (win + lose)) * 100
    let LP = data3[0].leaguePoints
    
    winRate = winRate.toPrecision(4)

    if (data3[0].queueType == "RANKED_SOLO_5x5")
        solo = "Classé solo"
    // else if (data3[1].queueType == "RANKED_SOLO_5x5")
    //     solo = "Classé solo"

    document.getElementById("rankIMGSolo").innerHTML = "<img src=\"embleme_rank/emblem-" + rank + ".png\">";
    document.getElementById("classementSolo").innerHTML = rank + " " + division
    document.getElementById("lpSolo").innerHTML = LP +" LP"
    document.getElementById("winrateSolo").innerHTML = winRate + " %"
    document.getElementById("typeSolo").innerHTML = solo
}



function statFlex(data3){
    if (data3[0].queueType == "RANKED_FLEX_SR")
        takeStatFlex(data3)
    else if (data3[1].queueType == "RANKED_FLEX_SR")
        takeStatFlex(data3)
}

function takeStatFlex(data3) {
    let flex = ""
    let rank = data3[1].tier
    let division = data3[1].rank
    let win = data3[1].wins
    let lose = data3[1].losses
    let winRate = (win / (win + lose)) * 100
    let LP = data3[1].leaguePoints
    
    winRate = winRate.toPrecision(4)

    if (data3[0].queueType == "RANKED_FLEX_SR")
        flex = "Classé flexible"
    // else if (data3[1].queueType == "RANKED_FLEX_SR")
    //     flex = "Classé flexible"

    document.getElementById("rankIMGFlex").innerHTML = "<img src=\"embleme_rank/emblem-" + rank + ".png\">";
    document.getElementById("classementFlex").innerHTML = rank + " " + division
    document.getElementById("lpFlex").innerHTML = LP +" LP"
    document.getElementById("winrateFlex").innerHTML = winRate + " %"
    document.getElementById("typeFlex").innerHTML = flex
}

// function takeStatFlex(data3){
//     console.log("flex");
//     //console.log(data3[0].rank);

// // console.log(data3[1], data3[0]);
// }






// document.getElementById("rank").innerHTML = rank + " " + division
// document.getElementById("winrate").innerHTML = winRate + "%"














// function typeQueue(data3) {
//     let solo;
//     let flex;
//     if (data3[0].queueType == "RANKED_SOLO_5x5")
//         return solo
//     else 
//         return flex
// }














// function getStats(item) {
//     let rank = item.tier
//     let division = item.rank
//     let name = item.summonerName
//     const win = item.wins
//     const lose = item.losses
//     let winRate = (win / (win + lose)) * 100
//     const LP = item.leaguePoints
//     const leagueId = item.leagueId
    
//     winRate = winRate.toPrecision(4)
//     document.getElementById("rankIMG").innerHTML = "<img src=\"embleme_rank/emblem-" + rank + ".png\">"

// }



// getStats(item)





//https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/FT3s2nafBqWZ9Arkgy5MkfIooy7SZ-p1bx9moQEMHUsEADIzA4sR24W0ehFkExFHLd3O0MgJ2x0GXQ/ids?start=0&count=100&api_key=RGAPI-9071850e-ea33-4cf7-9e26-3faaedfda017