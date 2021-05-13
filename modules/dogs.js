const axios = require('axios');

module.exports = {
    Get12Dogs: function () {
        return (Get12Dogs());
    }
}
let Get12Dogs = function () {
    //Starts the Workflow Instance. The beggining of the process
    return new Promise(function (resolve, reject) {    
        
        console.log(`Getting random ${process.env.DOG_SUBBREED} ${process.env.DOG_BREED} pics`)
        axios.request({
            url: "/api/breed/"
                +process.env.DOG_BREED+"/"
                +process.env.DOG_SUBBREED+"/images/random/",
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