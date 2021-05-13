fetch('/RandomDog')
    .then(response => response.json())
    .then(data => displayDog(data));

fetch('/DogCollection')
    .then(response => response.json())
    .then(data => displayDogCollection(data));

fetch('/Environment')
    .then(response => response.json())
    .then(data => displayEnvironment(data));


function displayDog(data){
    var container = document.getElementById("dog-container");
    var img = new Image();
    img.src = data[0];
    container.appendChild(img);

}

function displayDogCollection(data){
    var container = document.getElementById("dogs-container");

    data.forEach(dog => {
        var img = new Image();
        img.src = dog.url;
        container.appendChild(img);
    });
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