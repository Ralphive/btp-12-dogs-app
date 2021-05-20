randomDog()

fetch('/DogCollection')
    .then(response => response.json())
    .then(data => displayDogCollection(data));

fetch('/Environment')
    .then(response => response.json())
    .then(data => displayEnvironment(data));


function displayDog(data){
    document.getElementById("random-dog").src = data[0];
}

function displayDogCollection(data){
    var container = document.getElementById("dogs-container")
    
    data.slice().reverse().forEach(dog => {
        var img = new Image();
        img.src = dog.url;
        img.classList.add("img-fluid");
        var div = document.createElement("div");
        div.className = "p-0 col-md-2 col-4";
        div.appendChild(img)
        container.appendChild(div);
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

function randomDog(){
    fetch('/RandomDog')
    .then(response => response.json())
    .then(data => displayDog(data));
}

function addDog(){
// POST request using fetch()
fetch("/Dog", {  
    method: "POST",
    body: JSON.stringify({dog:document.getElementById("random-dog").src}),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then(() => {
    console.log("all good, refresh")
    location.reload()
});
}