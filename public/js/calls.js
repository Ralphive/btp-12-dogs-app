fetch('/Dogs')
    .then(response => response.json())
    .then(data => displayDogs(data));

fetch('/Environment')
    .then(response => response.json())
    .then(data => displayEnvironment(data));



function displayDogs(data){
    var container = document.getElementById("dogs-container");

    data.forEach(dogpic => {
        var img = new Image();
        img.src = dogpic;
        container.appendChild(img);
    });
    
    container = document.getElementById("dog-container");
    var img = new Image();
    img.src = data[1];
    container.appendChild(img);

}

function displayEnvironment(data){
    var container = document.getElementById("environment");
    
    Object.keys(data).forEach(function(key){
        var tag = document.createElement("div");
        var text = document.createTextNode(key+" = "+data[key]);
        tag.appendChild(text);
        container.appendChild(tag);
    });
}