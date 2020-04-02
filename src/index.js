const express = require('express');
const app = express();
const {Wg} = require('wireguard-wrapper');

// index
app.get('/', function(req, res){
	res.send([
		{
			url: '/wg',
			method: 'get',
			description: 'list of supported endpoints for the wg command'
		}
	]);
});

// wg index
app.get('/wg', function(req, res){
	res.send([
		{
			url: '/wg/show',
			method: 'get',
			description: 'returns a list of stats for all wireguard interfaces/devices'
		}, {
			url: '/wg/show/:device',
			method: 'get',
			description: 'returns stats for a specific wireguard interface/device',
			parameters: {
				device: 'name of the wireguard device/interface'
			}
		}, {
			url: '/wg/showconf/:device',
			method: 'get',
			description: 'returns configuration data for a specific wireguard interface/device',
			parameters: {
				device: 'name of the wireguard device/interface'
			}
		}, {
			url: '/wg/genkey',
			method: 'get',
			description: 'generates a private key'
		}, {
			url: '/wg/genpsk',
			method: 'get',
			description: 'generates a preshared key'
		}, {
			url: '/wg/pubkey/:privateKey',
			method: 'get',
			description: 'generates a public key for a given private key',
			parameters: {
				privateKey: 'Previously generated private key'
			}
		}
	]);
});

// wg (show)
app.get('/wg/show', function(req, res){
	Wg.show().then(function(dataRaw){
		let data = [];
		for(let devName of Object.keys(dataRaw)){
			data.push(dataRaw[devName].toJson());
		}
		res.send(data);
	}, function(err){
		res.status(500).send(err);
	});
});
app.get('/wg/show/:device', function(req, res){
	Wg.show(req.params.device).then(function(data){
		if(typeof data[req.params.device] === 'undefiend'){
			return res.status(404).send('Device/interface not found');
		}
		res.send(data[req.params.device].toJson());
	}, function(err){
		res.status(500).send(err);
	});
});

// wg showconf
app.get('/wg/showconf/:device', function(req, res){
	Wg.showconf(req.params.device).then(function(data){
		res.send(data.toJson());
	}, function(err){
		res.status(500).send(err);
	});
});

// wg genkey
app.get('/wg/genkey', function(req, res){
	Wg.genkey().then(function(key){
		res.send({privateKey: key});
	}, function(err){
		res.status(500).send(err);
	});
});

// wg genkey
app.get('/wg/genpsk', function(req, res){
	Wg.genpsk().then(function(psk){
		res.send({presharedKey: psk});
	}, function(err){
		res.status(500).send(err);
	});
});

// wg genkey
app.get('/wg/pubkey/:privateKey', function(req, res){
	Wg.pubkey(req.params.privateKey).then(function(publicKey){
		res.send({publicKey: publicKey});
	}, function(err){
		res.status(500).send(err);
	});
});

module.exports = app;