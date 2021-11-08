var menuItens = [
    {name: "People",  path: "/people/", img:"imgs/people.png"},
    {name: "Films",  path: "/films/", img:"imgs/films.png"},
    {name: "Species",  path: "/species/", img:"imgs/species.png"},
    {name: "Vehicles",  path: "/vehicles/", img:"imgs/vehicles.png"},
    {name: "Starships",  path: "/starships/", img:"imgs/starships.png"}
]; 
const menuID = "#menu-list";
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
    loadPath(menu.path).
        then(r =>{
            console.log('sucess loadPath');
            console.log(r);
        }).
        catch(e => console.log(e));
    return false;
}

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
