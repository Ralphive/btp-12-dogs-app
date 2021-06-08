const axios = require('axios');

module.exports = {
    GetDog: function () {
        return (GetDog());
    }
}
let GetDog = function () {
    return new Promise(function (resolve, reject) {    
        
        // III - Store config in environment
        console.log(`Getting random ${process.env.DOG_SUBBREED} ${process.env.DOG_BREED} pics`)
        axios.request({
            url: "/api/breed/"
                +process.env.DOG_BREED+"/"
                +process.env.DOG_SUBBREED+"/images/random/1",
            method: "GET",
            baseURL: "https://dog.ceo",
        }).then((res) => {
            if(res.data.message){
                console.log(res.data.message.length + " Dog pics retrieved")
                resolve(res.data.message)
            }
            resolve(res.data)
        }).catch((err) => {
            console.error(err)
            reject(err)
        });
    })
}