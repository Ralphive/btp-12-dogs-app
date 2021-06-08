/** Persistence Layer (PostGree) library */
module.exports = {
    Connect: function (response) {
        return (Connect());
    },
    Disconnect: function (response) {
        return (Disconnect());
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

//IV Backing Services- Treat backing services as attached resources
//Check where the PostgreSQL instance will come from. 
//From CF BackingServiecs or a local PG (credentials = null)
console.log("Looking for PostgresSQL credentials...")
if (process.env.VCAP_SERVICES) {
    vcap = JSON.parse(process.env.VCAP_SERVICES);
    if(vcap.hasOwnProperty('postgresql-db')){
        console.log("PostgresSQL found in VCAP Services")
        
        const vcapPG = vcap['postgresql-db'][0].credentials
        
        credentials = {
                        database: vcapPG.dbname,
                        host: vcapPG.hostname,
                        port: vcapPG.port,
                        user: vcapPG.username,
                        password: vcapPG.password,
                        ssl:{
                            ca:vcapPG.sslrootcert,
                            cert: vcapPG.sslcert
                        }
                    }
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
let Disconnect = function () {
    return new Promise(function (resolve, reject) {            
        
        pgClient.di
        pgClient.end()
        .then(() => {
            console.log('Disconnected from Postgresql')
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

function pgVcapCredentials(credentials){
    return {
        database: credentials.dbname,
        host: credentials.hostname,
        port: credentials.port,
        user: credentials.username,
        password: credentials.password,
        ssl:{
            ca:credentials.sslrootcert,
            cert: credentials.sslcert
        }
    }
}