/** Persistence Layer (PostGree) library */
module.exports = {
    Connect: function (response) {
        return (Connect());
    },
    Select: function (response) {
        return (Select(response));
    },
    Insert: function (data, response) {
        return (Insert(data, response));
    }
}

const pg = require("pg")

var credentials = null;
var vcap = null;

//Check where the PostgreSQL instance will come from. 
//From CF BackingServiecs or a local PG (credentials = null)
console.log("Connecting to PostgresSQL...")
if (process.env.VCAP_SERVICES) {
    vcap = JSON.parse(process.env.VCAP_SERVICES);
    if(vcap.hasOwnProperty('postgresql-db')){
        //Postgresql on CloudFoundry services
        credentials = { connectionString: vcap['postgresql-db'][0].credentials.uri }
        console.log("PostgresSQL found in VCAP Services")
    }else{
        console.log("No PostgresSQL found in VCAP Services")
    }
}

var pgClient = new pg.Client(credentials)

let Connect = function () {
    return new Promise(function (resolve, reject) {            
        pgClient.connect()
        .then(() => {
            console.log('connected to Postgresql')
            resolve()
        }).catch((err) => {
            console.error(err)
            reject()
        });
    })
}

let Select = function () {
    return new Promise(function (resolve, reject) {            
        pgClient.query('SELECT * FROM dog_collection')
        .then((res) => {
            resolve(res.rows)
        }).catch((err) => {
            console.error(err.stack)
            reject()
        });
    })
}

let Insert = function (data) {
    return new Promise(function (resolve, reject) {    
        const text = 'INSERT INTO dog_collection(url,breed, subbreed) VALUES($1, $2, $3)'  
        const values =[data, process.env.DOG_BREED, process.env.DOG_SUBBREED]      
        pgClient.query(text,values)
        .then((res) => {
            console.log(data+ " added to collection")
            resolve()
        }).catch((err) => {
            console.error(err.stack)
            reject()
        });
    })
}