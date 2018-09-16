var express					=	require('express.oi');
//var app						=	express().http().io();
var adapter					=	require('../../adapter-lib.js');
var mobile					=	new adapter("mobile");
var status					=	{};
var timeout					=	"";
var fs						=	require('fs');

if(mobile.settings.useHTTPS){
	var options = {
		key: fs.readFileSync('./key.pem'),
		cert: fs.readFileSync('./cert.pem')
	}
	var app						=	express().https(options).io();
}else{
	var app						=	express().http().io();
}

process.on('message', function(data) {
	var data = JSON.parse(data);
	pushbullet.log.error(data.protocol);
	switch(data.protocol){
		case "setSetting":
			mobile.setSetting(data.setSetting.name, data.setSetting.status);
			break;
		default:
			mobile.log.error(data);
			break;
	}
});

app.use(express.static(__dirname + '/dist'));		// provides static htmls

app.get('/mobile', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

try{
	app.listen(mobile.settings.port, function(){
		process.send({"statusMessage": "Läut auf Port:" + mobile.settings.port});
	});
}catch(e){
    mobile.log.error("Port besetzt");
}