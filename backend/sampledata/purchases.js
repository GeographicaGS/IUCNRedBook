var config = require('./config.js');

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var json2csv = require('json2csv');

var data = []

var types = ["fuel","fuel","product"];

var maxIDStation = 240;

var maxIDUser = 100000;

for (var i=0;i<500000;i++){

    var type = types[Math.floor( Math.random()*types.length)];
    var amount = type == "fuel" ? Math.ceil(Math.random()*80) : Math.ceil(Math.random()*15) ;
    data.push({
        id_station : Math.ceil(Math.random()*maxIDStation),
        id_user: Math.ceil(Math.random()*maxIDUser),
        type : type,
        amount : amount,
        date_purchase : chance.date({year: 2015}),
        element : chance.sentence({words: 2})
    });
}

var fields = ['id_station', 'id_user', 'type','amount','date_purchase','element'];

json2csv({ data: data, fields: fields,del: ';' }, function(err, csv) {
    if (err) console.log(err);
    var fs = require('fs');
    fs.writeFile("user_purchases.csv",csv, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});
//console.log(data);
