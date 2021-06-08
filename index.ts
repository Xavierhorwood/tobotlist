const fs = require('fs');
const { setMaxListeners } = require('process');
const readline = require('readline');
var config = require('./config.json');

async function processLineByLine() {
  const fileStream = fs.createReadStream('../bots.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var name = config.name;
  var description = config.description;
  var title = config.title;
  var update_url = config.update_url
  var authors = '"cyrexlinuz","xavierhorwood"';
  var file_info = '"file_info": {' + '"update_url":"' + update_url + '",' + '"title":"' +title+ '",' + '"description":"' + description + '",' + '"name":"' + name + '",' +  '"authors": [' + authors + "]" + '},';
  var steamids = '"players": [';
  var steamids2 = ']';

  for await (const line of rl) {
    var data = line;
    if(data == "")
    {
        continue;
    }
    else if(data.charAt(0) == "#")
    {
        continue;
    }


    var data2 = data.replace(/\s/g, '');
    var data3 = data2.replace("]","[")
    var data4 = data3.split("[");
    var data5 = "[" + data4[1] + "]"
    
    steamids += '{ "attributes": ["cheater"], "steamid": "' + data5 + '"},'
  }
  var players = steamids + steamids2;
  players = players.substr(0, players.length - 2);
  players += "]";
  var $schema = config.$schema;
  var all = "{" + '"$schema": "' + $schema + '",' + file_info + players + "}";
  fs.writeFileSync('../playerlist.cyrexlinuz.json', all);
}

processLineByLine();