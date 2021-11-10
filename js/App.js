
const LOADER = "<img src='imgs/loader.gif' id='loading'></img>";
const containerID = "#body-container";
$( document ).ready(function() {
    onCreate().then(console.log('onCreateComplete...'));
});
 
var onCreate = () => {
    return new Promise((resolve, reject) => {
        loadFilmList().
            then(r => resolve(r)).
            catch(e => reject(e));    
    });
};

var loadFilmList = () => {
    return new Promise((resolve, reject) => {
        $(containerID).html(LOADER);  
        loadPath('https://swapi.dev/api/films/').
        then(data => { 
            createFilmList(data).
            then(r => resolve(r)).
            catch(e => reject(e));
        }).
        catch(e => alert(e));
    });
};

var createFilmList = (data) => {
    return new Promise((resolve, reject) => {
            $(containerID).html("<h1 class='title'> FILMS </h1> <ul id=\"film-list\"> </ul>");
            data.results.map(it => $("#film-list").
                append("<li><h3> <a href='#' onclick=\"openFilm('"+it.url+"')\"> 🎞 "+it.title+"</h3> </li>")).
                    then(resolve({ok:1}));   
    });
};

var openFilm = (url) => {
    console.log(url);
    $(containerID).html(LOADER);
    createFilmItem(url).
        then(r => console.log('load file item . . .')).
        catch(e => console.log(e));
};

var createFilmItem = (url) => {
    return new Promise((resolve, reject)=>{
        loadPath(url).
        then(data => {
            $(containerID).html("<a href='#' class='button-back' onclick='loadFilmList();'> [ BACK] </a>");
            $(containerID).append("<p><b class='episode-number'> "+data.episode_id+
            "</b> <span class='title'>"+data.title+"</span></p>");
            $(containerID).append("<p>Director : <b class='sub-item'>"+data.director+"</b></p>");
            $(containerID).append("<p>Producer : <b class='sub-item'>"+data.producer+"</b></p>");
            $(containerID).append("<p>Release date : <b class='sub-item'>"+data.release_date+"</b></p>");
            $(containerID).append("<p class='sub-title'>Opening crawl</p> <p>"+data.opening_crawl+"</p>");
            $(containerID).append("<p class='sub-title'>Characters</p> <ul id='characters'> </ul>");
            createCharactersToFilm(data.characters).then();
            $(containerID).append("<p class='sub-title'>Planets</p> <ul id='planets'> </ul>");
            createItemToFilm(data.planets, "#planets").then();
            $(containerID).append("<p class='sub-title'>Starships</p> <ul id='starships'> </ul>");
            createItemToFilm(data.starships, "#starships").then();
            $(containerID).append("<p class='sub-title'>Vehicles</p> <ul id='vehicles'> </ul>");
            createItemToFilm(data.vehicles, "#vehicles").then();
            $(containerID).append("<p class='sub-title'>Species</p> <ul id='species'> </ul>");
            createItemToFilm(data.species, "#species").then();            
            resolve(1);
        }).catch(e => reject(e));
    });
}
var createItemToFilm = (planets, container) => {
    return new Promise((resolve, reject) =>{
        const promises = planets.map((it)=> loadPath(it));
            Promise.allSettled(promises).
                then((results)=> results.
                    map(
                        (it)=> $(container).
                        append("<li> "+it.value.name+" </li>") 
                    ) 
                );
        resolve(1);            
    });
};
var createCharactersToFilm = (characters) => {
    return new Promise((resolve, reject) =>{
        const promises = characters.map((it)=> loadPath(it));
            Promise.allSettled(promises).
                then((results)=> results.
                    map(
                        (it)=> $("#characters").
                        append("<li> "+it.value.name+" </li>") 
                    ) 
                );
        resolve(1);            
    });
}

var loadPath = (url) => {
    return new Promise((resolve, reject) => { 
        fromLocal(url).
            then(r=> resolve(data)).
            catch(e=> { 
                $.ajax({
                    type: 'GET',
                    url: url,
                    cache: true,
                  }).done(function(data){
                    setPath(url, data).
                    then(r=> resolve(data)).
                    catch(e=> reject(0));
                    }).fail(function(data){
                      reject(data);
                    });
            });
    });
};
var setPath = (url, data) => {
    return new Promise((resolve, reject) => { 
        localStorage.setItem(url, JSON.stringify(data)); 
        resolve(1);      
    });
};

var fromLocal = (url) => {
    return new Promise((resolve, reject) => {
        const data = localStorage.getItem(url);
        if(data){
            resolve(JSON.parse(data));
        }else{
            reject(0);
        }
    });
};