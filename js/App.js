var menuItens = [
    {name: "People",  path: "/people/", img:"imgs/people.png"},
    {name: "Films",  path: "/films/", img:"imgs/films.png"},
    {name: "Species",  path: "/species/", img:"imgs/species.png"},
    {name: "Vehicles",  path: "/vehicles/", img:"imgs/vehicles.png"},
    {name: "Starships",  path: "/starships/", img:"imgs/starships.png"}
]; 
const menuID = "#menu-list";
const containerID = "#body-menu";
const menuSelect = 0;
$( document ).ready(function() {
    onCreate().then(console.log('onCreateComplete...'));
});
 
var onCreate = () => {
    return new Promise((resolve, rejecty)=>{
        menuItens.
            map(function(value, i) {
                $( menuID ).append( "<li id=\"menu-item-"+i+"\"> <a href=\"#\" onclick=\"openMenu("+i+");\">"+value.name+"</a></li>" );
            }).
            then( resolve({sucess:1}) );
    });
};

function openMenu(item){
    $("#menu-item-"+this.menuSelect).removeClass("menu-select");
    this.menuSelect = item;
    let menu = this.menuItens[item];
    $("#menu-item-"+item).addClass("menu-select");
    $(containerID).html("<h1> Carregando... </h1>")
    loadPath(menu.path).
        then(r =>{
            console.log('sucess loadPath');
            console.log(r);
            showDataByType(r, item).
                then(sucess => console.log('complete showDataByType...')).
                catch(er => console.log(er));
        }).
        catch(e => console.log(e));
    return false;
}

var showDataByType = ( data, type ) => {
    if( type == 0){
        return updatePeoples(data);
    }else if(type == 1){
        return updateFilms(data);
    }else if(type == 2){
        return updateSpecies(data);
    }else if(type == 3){
        return updateVehicles(data);
    }else if(type == 4){
        return updateStarships(data);
    }
};



var loadPath = (method) => {
    return new Promise((resolve, reject) => {
        let url = ("https://swapi.dev/api"+method);
        console.log(url);
        $.ajax({
            type: 'GET',
            url: url
          }).done(function(data){
            resolve(data);  
          }).fail(function(data){
              reject(data);
          });
    });
};


var updateStarships = (data) => {
    return new Promise((resolve, reject) => { 
        $(containerID).html("<h1> Starships </h1>")
        resolve(1)
    });
};

var updateVehicles = (data) => {
    return new Promise((resolve, reject) => { 
        $(containerID).html("<h1> Vehicles </h1>")
        resolve(1)
    });
};

var updateSpecies = (data) => {
    return new Promise((resolve, reject) => { 
        $(containerID).html("<h1> Species </h1>")
        resolve(1)
    });
};

var updateFilms = (data) => {
    return new Promise((resolve, reject) => { 
        $(containerID).html("<h1> Films </h1>")
        resolve(1)
    });
};


var updatePeoples = (data) => {
    return new Promise((resolve, reject) => {
        var navCont = "<div id=\"container-navigation\"> ";
        if(data.previous){
            navCont += " <button onclick=\"loadPage('"+data.previous+"')\"> PREVIOUS </button>";
        }
        if(data.next){
            navCont += " <button onclick=\"loadPage('"+data.next+"')\"> NEXT </button>";
        }
        navCont += " </div> <br/> <h5> TOTAL: "+data.count+"</h5>";

        var itens = "";
         data.results.map(item =>{
            itens += "<h2>"+item.name+"</h2>";
        });
        $(containerID).html(navCont+itens);
         
        resolve(1);
    });
};
