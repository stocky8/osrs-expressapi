var app = require('express')();
var http = require('http').Server(app);
const osrs = require("osrs-wrapper");

app.get('/osrs.api/stats/:ingameName', function(req, res){
  var plyName = req.params.ingameName;
  try{
    osrs.hiscores.getPlayer(plyName).then(player => {
      var plyStats = JSON.stringify(player, null, 2);
      console.log("Sending stats for " + plyName);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(plyStats);
      return;
    });
  }catch(err){
    console.log("Error retrieving stats for " + plyName);
    res.status(203).send("Error retrieving stats for " + plyName + "<br>" + err);
  }
});


app.get('/', function(req, res){
  res.status(404).send('<h1>404 - Not Found</h1>');
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
http.timeout = 1000;
