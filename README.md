# NodeJS Wireguard REST-API
This project is a nodejs REST-API for the wireguard commands `wg` and `wg-quick`.

Limitations:
- So far it can only read but not write anything
- missing `wg set`, `wg setconf`, `wg addconf`, `wg syncconf`

## Installation
```
npm i --save wireguard-rest
```

## Example
Create file `index.js` with the following contents:
```
const app = require('wireguard-rest');

app.listen(1234, function(){
    console.log(`Wireguard API listening on port 1234`);
});
```

Start the script:
```
node index.js
```

Or run it in the background with pm2:
```
pm2 start index.js --name wireguard-rest
```

## Endpoints
Commands:
- `/` - list of general commands
- `/wg` - list of supported endpoints for the wg command
- `/wg/show` - returns a list of stats for all wireguard interfaces/devices
- `/wg/show/:device` - returns stats for a specific wireguard interface/device
- `/wg/showconf/:device` - returns configuration data for a specific wireguard interface/device
- `/wg/genkey` - generates a private key
- `/wg/genpsk` - generates a preshared key
- `/wg/pubkey/:privateKey` - generates a public key for a given private key