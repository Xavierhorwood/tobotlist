const fs = require('fs');
const { setMaxListeners } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('../bots.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var name = "cyrexlinuz bot list";
  var description = "https://github.com/cyrexlinuz/detected-catbots/blob/main/bots.txt";
  var title = "cyrexlinuz bot list";
  var authors = '"cyrexlinuz","xavierhorwood"';
  var file_info = '"file_info": {' + '"title":"' +title+ '",' + '"description":"' + description + '",' + '"name":"' + name + '",' +  '"authors": [' + authors + "]" + '},';
  var steamids = '"players": [';
  var steamids2 = ']';

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    //console.log(line);
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
    
    //steamids.push({"attributes" : attributes, "steamid" : data5})
  }
  var players = steamids + steamids2;
  players = players.substr(0, players.length - 2)
  players += "]"
  var $schema = "https://raw.githubusercontent.com/PazerOP/tf2_bot_detector/master/schemas/v3/playerlist.schema.json";
  var all = "{" + '"$schema": "' + $schema + '",' + file_info + players + "}";
  //console.log(all)
  fs.writeFileSync('../playerlist.cyrexlinuz.json', all);
}

processLineByLine();