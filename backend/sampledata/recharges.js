var config = require('./config.js');

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var json2csv = require('json2csv');

var data = [];


var types = ["own","own","own","own","third party","checkout","checkout"];

var maxIDStation = 240;

var maxIDUser = 100000;


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var pg = require('pg');
pg.defaults.poolIdleTimeout = 300*1000;
var conString = "postgres://postgres:@192.168.59.103/test";

var total_towns = 0;
var total_towns_completed = 0;

function createDataForCities(client,done,cod_prov,cod_mun,pop){
    // 5% of population
    var nPoints = Math.ceil(pop*0.015);

    var query = 'WITH points AS (' +
        '   SELECT RandomPointsInPolygon(' +
        '       (SELECT geom FROM spain_cities_population WHERE cod_prov=$1 and cod_mun=$2)' +
        '   ,$3) as geom)' +
        ' SELECT st_x(geom) as lng, st_y(geom) as lat FROM points';

    client.query(query,[cod_prov,cod_mun,nPoints],
        function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
          return console.error('error running query:\n' + query, err);
        }

        for (var i=0;i<result.rows.length;i++){

            data.push({
                id_user: Math.ceil(Math.random()*maxIDUser),
                type : types[Math.floor( Math.random()*types.length)],
                amount : Math.random()*250,
                date_recharge : chance.date({year: 2015}),
                latitude : result.rows[i].lat,
                longitude : result.rows[i].lng,
                prov : cod_prov
            });
        }

        total_towns_completed++;

        console.log(total_towns - total_towns_completed);

        if (total_towns == total_towns_completed){
            generateCSV();
        }

    });

}

function generateCSV(){

    console.log('Total records: ' + data.length);
    var fields = ['date_registered', 'name', 'latitude','longitude','email','age','prov'];

    json2csv({ data: data, fields: fields,del: ';' }, function(err, csv) {
        if (err) console.log(err);
        var fs = require('fs');
        fs.writeFile("user_recharges.csv",csv, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file user_recharges.csv was saved!");
        });
    });

}

//this starts initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }

    client.query('SELECT cod_prov,cod_mun,pop_total_2013 FROM spain_cities_population ORDER by name', function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
          return console.error('error running query', err);
        }

        total_towns = result.rows.length;
        for (var i=0;i<result.rows.length;i++){
            createDataForCities(client,done,result.rows[i].cod_prov,result.rows[i].cod_mun,result.rows[i].pop_total_2013);
        }
    });
});
