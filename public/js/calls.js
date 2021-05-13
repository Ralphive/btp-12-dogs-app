fetch('/Dogs')
  .then(response => response.json())
  .then(data => displayDogs(data));


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