# Minimal NodeJS API Server

An example on how to create a express server that implements a GET/PUT API.
An implementation of this server in use can be found in: https://skynet-namespace.glitch.me/

## Usage
Simply run ```npm start```. A new window will open explaining how to interact with the server.


Send a PUT request to https://skynet-namespace.glitch.me/ with the access-key, secret-key, domain name, and sialink. The server then will comunicate with the namebase api to update the domain, and point it to the new sialink.

```
const ak = "ACCESS KEY"
const sk = "SECRET KEY"
const domain = "YOUR HNS DOMAIN"
const sialink = "NEW SIALINK"

const data = `{"access_key":"${ak}", "secret_key":"${sk}", "sialink":"${sialink}", "domain":"${domain}"}`
opts = {method:'PUT', body:data, headers:{'Content-Type':'application/json'}}

fetch('https://skynet-namespace.glitch.me/', opts)
.then(result => result.json())
.then(result => console.log(result))
.catch(err => console.error('error', err)) 
```
