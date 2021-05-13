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


function Insert(data, callback) {
    console.log('PG Inserting Table data '+ JSON.stringify(data))

    var query = 'INSERT INTO fact12_bps(code,name, type, integrated) VALUES($1, $2, $3, $4)';
    pgClient.query(query, [data.code,data.name,data.type, false], function (err,result){
        if (err) {
            callback(err)
        }else{
            callback(null, result)
        }
    });
}
